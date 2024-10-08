import Image from "next/image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function BentoGrid() {
  return (
    <section className="py-32">
      <MaxWidthWrapper>
        <div className="relative z-10 grid grid-cols-6 gap-3">
          {/* First card */}
          <div className="relative col-span-full flex overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-2">
            <div className="relative m-auto size-fit">
              <div className="relative flex h-24 w-56 items-center">
                <svg
                  className="absolute inset-0 size-full text-muted-foreground/30"
                  viewBox="0 0 254 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* path tag omitted */}
                </svg>
                <span className="text-gradient_indigo-purple mx-auto block w-fit font-heading text-5xl">
                  100%
                </span>
              </div>
              <h2 className="mt-6 text-center font-heading text-2xl md:text-3xl lg:text-4xl">
                Customizable Solutions
              </h2>
              <p className="mt-4 text-center">
                DreamBez is technology that adapts to you, a space where creativity and efficiency blend seamlessly to provide personalized solutions.
              </p>
            </div>
          </div>

          {/* Second card */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 sm:col-span-3 lg:col-span-2">
            <div>
              <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border before:bg-muted/20 dark:before:border-white/5">
                <svg
                  className="m-auto h-fit w-24"
                  viewBox="0 0 212 143"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* path tag omitted */}
                </svg>
              </div>
              <div className="relative z-10 mt-8 space-y-1.5 text-center">
                <h2 className="text-lg font-medium text-foreground">Secure by Design</h2>
                <p className="text-muted-foreground">
                  Your data is protected with top-notch security, giving you peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Third card */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 sm:col-span-3 lg:col-span-2">
            <div>
              <div>
                <span className="text-gradient_indigo-purple mx-auto block w-fit font-heading text-xl">
                  Usually in 10 seconds
                </span>
                <svg className="h-26 w-full" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* path tag omitted */}
                </svg>
              </div>
              <div className="relative z-10 mt-8 space-y-1.5 text-center">
                <h2 className="text-lg font-medium text-foreground">Lightning-Fast Results</h2>
                <p className="text-muted-foreground">Get AI-generated headshots in 10 seconds.</p>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5 dark:before:bg-white/5">
                  <svg className="m-auto size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    {/* path tag omitted */}
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">Professional Quality</h2>
                  <p className="text-muted-foreground">
                    AI-generated headshots that rival professional photography, perfect for any occasion and purpose.
                  </p>
                </div>
              </div>
              <div className="relative -mb-10 -mr-10 mt-8 h-fit rounded-tl-xl border bg-muted/30 pt-6 sm:ml-6 sm:mt-auto">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full border border-border"></span>
                  <span className="block size-2 rounded-full border border-border"></span>
                  <span className="block size-2 rounded-full border border-border"></span>
                </div>
                <svg className="w-full text-indigo-600/60 sm:w-[150%]" viewBox="0 0 366 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* path tag omitted */}
                </svg>
              </div>
            </div>
          </div>

          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid h-full sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5 dark:before:bg-white/5">
                  <svg className="m-auto size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    {/* path tag omitted */}
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">Effortlessly Fun</h2>
                  <p className="text-muted-foreground">
                    Enjoy a seamless and enjoyable process, from capturing to receiving your headshots. It’s as fun as it is professional.
                  </p>
                </div>
              </div>
              <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-purple-500/50 sm:-my-8 sm:-mr-8">
                <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                  <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">Superhero</span>
                    <div className="size-7 ring-4 ring-background">
                      <Image
                        width={100}
                        height={100}
                        className="size-full rounded-full border object-cover"
                        src="https://s.headshots.fun/options-img/superhero.jpeg"
                        alt="Superhero"
                      />
                    </div>
                  </div>
                  <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                    <div className="size-8 ring-4 ring-background">
                      <Image
                        width={100}
                        height={100}
                        className="size-full rounded-full border object-cover"
                        src="https://s.headshots.fun/options-img/witch.jpeg"
                        alt="Witch"
                      />
                    </div>
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">Witch</span>
                  </div>
                  <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">Clay</span>
                    <div className="size-7 ring-4 ring-background">
                      <Image
                        width={100}
                        height={100}
                        className="size-full rounded-full border object-cover"
                        src="https://s.headshots.fun/options-img/clay.jpeg"
                        alt="Clay"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
