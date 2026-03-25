import { BlinkingSmile } from "@/BlinkingSmile";
import { Divider, Icon, PageHeader, PictureDisplay } from "@/components";
import { PictureCarousel } from "@/components/PictureCarousel";

const sportsPictures: React.ComponentProps<typeof PictureCarousel>["items"] = [
  {
    src: "/images/assets/image_02.jpg",
    alt: "Me playing volleyball",
    label:
      "Volleyball has become part of my routine, something that helped me grow as a person and connect with the sport.",
    offset: "50% 30%",
  },
  {
    src: "/images/assets/image_03.png",
    alt: "Me surfing",
    label:
      "Surfing is an adventure I enjoy whenever I can. The connection with nature and that feeling of butterflies in my stomach that only those in the ocean truly understand.",
  },
  {
    src: "/images/assets/image_04.jpg",
    alt: "Me playing flag football",
    label:
      "I’ve always enjoyed trying new sports, and flag football has been one of my recent passions.",
  },
];

export const About = () => {
  const downloadResume = () => {};

  return (
    <div className="page">
      <div className="mx-auto flex min-h-full w-full max-w-215 flex-col gap-4 px-8 py-4">
        <PageHeader
          title={
            <>
              Welcome <BlinkingSmile />
            </>
          }
          subtitle="Let Me Introduce Myself"
        />

        <Divider />

        <div className="flex flex-col gap-4">
          <p className="font-writing text-[14px]">
            My name is Kevin Katzer and I'm a Full Stack Developer with 7+ years
            of experience building (or hacking as my dad would say) web
            applications. My main focus lately in on the JavaScript and
            TypeScript ecosystem, delivering good user experiences and building
            reliable systems a cross modern architectures and platform
            engineering,
          </p>
        </div>

        <div className="boxshadow-win95 flex flex-row items-center gap-4 p-3">
          <Icon icon="wordpad" size="medium" alt="Wordpad icon" />

          <div className="flex flex-col leading-snug">
            <p className="text-[16px] font-bold">Looking for my resume?</p>
            <button
              type="button"
              className="font-writing cursor-pointer bg-transparent text-left text-[14px] text-blue-600 underline"
              onClick={downloadResume}
            >
              Click here to download it
            </button>
          </div>
        </div>

        <div className="mt-2 flex min-w-0 flex-col gap-2">
          <p className="font-writing text-[22px] font-bold">About me</p>

          <div className="flow-root">
            <PictureDisplay
              className="mb-4 md:float-right md:mb-3 md:ml-6 md:w-2/5"
              image="/images/assets/image_01.jpeg"
              alt="Me as a child playing on the computer"
              label="Me probably playing Mario or emulating a Pokemon game."
            />

            <p className="font-writing min-w-0 text-[14px]">
              I’ve been fascinated by computers since when I was a kid. When I
              moved to Santa Catarina when I was eight I didn’t had many kids
              around to play with, which led me to spend a lot of time on the
              computer, something that quickly turned into a habit and a
              passion. It was during this time that my first dream was born: to
              create my own games.
            </p>

            <p className="font-writing mt-4 min-w-0 text-[14px]">
              In high school, I had the opportunity to study at a technical
              school, where I chose an IT program to take my first steps toward
              that goal. Over time, during my technical studies, my interests
              naturally shifted toward web development. While my passion for
              game development remains, it has become more of a personal hobby,
              while I continue to grow professionally in the web development
              field.
            </p>

            <p className="font-writing mt-4 min-w-0 text-[14px]">
              Alongside my studies, I discovered another side of myself through
              sports. I became actively involved in athletics, competing in
              beach volleyball championships representing my city at the youth
              level. To this day, I continue to explore different sports,
              including basketball, volleyball, flag football, and surfing
              whenever I can.
            </p>
          </div>
        </div>

        <div className="mt-2 flex min-w-0 flex-col gap-2">
          <p className="font-writing text-[22px] font-bold">
            Life Outside the Screen
          </p>

          <PictureCarousel items={sportsPictures} />
        </div>
      </div>
    </div>
  );
};
