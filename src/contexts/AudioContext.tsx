import React from "react";

type AudioContextType = {
  sfxVolume: number;
  clickVolume: number;
  tapVolume: number;
  ambientVolume: number;
  setSfxVolume: React.Dispatch<React.SetStateAction<number>>;
  setAmbientVolume: React.Dispatch<React.SetStateAction<number>>;
  playTapSound: () => void;
};

const CLICK_SOUNDS = [
  "/sounds/mouse_click_01.wav",
  "/sounds/mouse_click_02.wav",
] as const;

const TAP_SOUNDS = [
  "/sounds/tap_01.wav",
  "/sounds/tap_02.wav",
  "/sounds/tap_03.wav",
] as const;

const AMBIENT_SOUND = "/sounds/office-white-noise-loop.wav";
const ALL_SOUNDS = [...CLICK_SOUNDS, ...TAP_SOUNDS];
const DEFAULT_SFX_VOLUME = 0.35;
const DEFAULT_TAP_VOLUME = 0.2;
const TAP_TO_SFX_VOLUME_RATIO = DEFAULT_TAP_VOLUME / DEFAULT_SFX_VOLUME;
const DEFAULT_AMBIENT_VOLUME = 0.06;

export const AudioContext = React.createContext<AudioContextType | undefined>(
  undefined,
);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const preparedAudiosRef = React.useRef<Record<string, HTMLAudioElement>>({});
  const activeAudiosRef = React.useRef<Set<HTMLAudioElement>>(new Set());
  const ambientAudioContextRef = React.useRef<AudioContext | null>(null);
  const ambientGainNodeRef = React.useRef<GainNode | null>(null);
  const ambientSourceNodeRef = React.useRef<AudioBufferSourceNode | null>(null);
  const ambientBufferRef = React.useRef<AudioBuffer | null>(null);
  const ambientBufferPromiseRef = React.useRef<Promise<AudioBuffer> | null>(
    null,
  );
  const tapSoundIndexRef = React.useRef(0);
  const hasUserInteractedRef = React.useRef(false);

  const [sfxVolume, setSfxVolume] = React.useState(DEFAULT_SFX_VOLUME);
  const [ambientVolume, setAmbientVolume] = React.useState(
    DEFAULT_AMBIENT_VOLUME,
  );
  const clickVolume = sfxVolume;
  const tapVolume = sfxVolume * TAP_TO_SFX_VOLUME_RATIO;

  const playPreparedSound = React.useCallback((src: string, volume: number) => {
    const preparedAudio = preparedAudiosRef.current[src];

    if (!preparedAudio) return;

    const audioInstance = preparedAudio.cloneNode() as HTMLAudioElement;
    audioInstance.volume = volume;

    activeAudiosRef.current.add(audioInstance);

    const removeAudioInstance = () => {
      activeAudiosRef.current.delete(audioInstance);
      audioInstance.removeEventListener("ended", removeAudioInstance);
      audioInstance.removeEventListener("pause", removeAudioInstance);
    };

    audioInstance.addEventListener("ended", removeAudioInstance);
    audioInstance.addEventListener("pause", removeAudioInstance);

    void audioInstance.play().catch(() => {
      removeAudioInstance();
    });
  }, []);

  const playClickSound = React.useCallback(() => {
    const randomSound =
      CLICK_SOUNDS[Math.floor(Math.random() * CLICK_SOUNDS.length)];

    playPreparedSound(randomSound, clickVolume);
  }, [clickVolume, playPreparedSound]);

  const playTapSound = React.useCallback(() => {
    if (!hasUserInteractedRef.current) return;

    const nextTapSound = TAP_SOUNDS[tapSoundIndexRef.current];
    tapSoundIndexRef.current =
      (tapSoundIndexRef.current + 1) % TAP_SOUNDS.length;

    playPreparedSound(nextTapSound, tapVolume);
  }, [tapVolume, playPreparedSound]);

  const ensureAmbientAudioContext = React.useCallback(() => {
    const existingAudioContext = ambientAudioContextRef.current;

    if (existingAudioContext) return existingAudioContext;

    const audioContext = new window.AudioContext();
    const gainNode = audioContext.createGain();

    gainNode.gain.value = ambientVolume;
    gainNode.connect(audioContext.destination);

    ambientAudioContextRef.current = audioContext;
    ambientGainNodeRef.current = gainNode;

    return audioContext;
  }, [ambientVolume]);

  const loadAmbientBuffer = React.useCallback(async () => {
    if (ambientBufferRef.current) return ambientBufferRef.current;

    if (ambientBufferPromiseRef.current) {
      return ambientBufferPromiseRef.current;
    }

    const audioContext = ensureAmbientAudioContext();

    ambientBufferPromiseRef.current = fetch(AMBIENT_SOUND)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load ambient audio");
        }

        return response.arrayBuffer();
      })
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer.slice(0)))
      .then((audioBuffer) => {
        ambientBufferRef.current = audioBuffer;
        return audioBuffer;
      })
      .finally(() => {
        ambientBufferPromiseRef.current = null;
      });

    return ambientBufferPromiseRef.current;
  }, [ensureAmbientAudioContext]);

  const startAmbientSound = React.useCallback(async () => {
    const audioContext = ensureAmbientAudioContext();

    if (ambientSourceNodeRef.current) return;

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const audioBuffer = await loadAmbientBuffer();
    const gainNode = ambientGainNodeRef.current;

    if (!gainNode || ambientSourceNodeRef.current) return;

    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.connect(gainNode);
    sourceNode.start(0);

    ambientSourceNodeRef.current = sourceNode;
  }, [ensureAmbientAudioContext, loadAmbientBuffer]);

  React.useEffect(() => {
    const preparedAudios = ALL_SOUNDS.reduce<
      Record<string, HTMLAudioElement>
    >((acc, src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.load();

      acc[src] = audio;
      return acc;
    }, {});
    const activeAudios = activeAudiosRef.current;

    preparedAudiosRef.current = preparedAudios;

    return () => {
      Object.values(preparedAudios).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });

      activeAudios.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });

      activeAudios.clear();
      ambientSourceNodeRef.current?.stop();
      ambientSourceNodeRef.current?.disconnect();
      ambientSourceNodeRef.current = null;
      ambientGainNodeRef.current?.disconnect();
      ambientGainNodeRef.current = null;
      ambientBufferRef.current = null;
      ambientBufferPromiseRef.current = null;
      void ambientAudioContextRef.current?.close();
      ambientAudioContextRef.current = null;
      preparedAudiosRef.current = {};
    };
  }, []);

  React.useEffect(() => {
    const ambientGainNode = ambientGainNodeRef.current;

    if (!ambientGainNode) return;

    ambientGainNode.gain.value = ambientVolume;
  }, [ambientVolume]);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const appRoot = document.querySelector(".viewport-shell");
      const eventTarget = event.target;

      if (!(eventTarget instanceof Node) || !appRoot?.contains(eventTarget)) {
        return;
      }

      hasUserInteractedRef.current = true;
      startAmbientSound();
      playClickSound();
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [playClickSound, startAmbientSound]);

  return (
    <AudioContext.Provider
      value={{
        sfxVolume,
        clickVolume,
        tapVolume,
        ambientVolume,
        setSfxVolume,
        setAmbientVolume,
        playTapSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
