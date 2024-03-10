"use client";
import { FC, useCallback, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CardList.module.scss";
import clsx from "clsx";
const data1 = {
  id: 1,
  title: "Introduction to programming",
  label: ["Beginner"],
  desc: "This course covers the most basic concepts in programming using Solidity as an example.",
  hour: 36,
  course: 5,
  completed: "45%",
};

const data2 = {
  id: 2,
  title: "Moonshot 2023 Summer Hackathon",
  label: ["All Tracks", "Solidity", "ZK"],
  signup: "4/15 - 6/15",
  event: "6/15 - 7/15",
  grant_size: "200K",
};

const data3 = {
  id: 3,
  title: "Web 3.0 Programming Basics",
  label: ["Advanced"],
  desc: "Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.",
  hour: 36,
  course: 5,
};

const data4 = {
  id: 4,
  title: "What is Bitcoin",
  hour: 36,
};

const item_bg = "bg-contain bg-no-repeat";
function throttle(fn: any, wait: number) {
  let inThrottle = false;
  return (...args: any) => {
    // @ts-ignore
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      fn.apply(context, args);
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }
  };
}

const CardList: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [leftDisable, setLeftDisable] = useState(true);
  const [rightDisable, setRightDisable] = useState(false);

  const handlePreThrottle = throttle(() => {
    const elList = document.getElementsByClassName(styles.item_container);
    const distance = elList[0].clientWidth + 50;
    const max = elList.length * distance;
    if (ref.current && ref.current.scrollLeft < max) {
      if (ref.current.scrollLeft <= distance) {
        setLeftDisable(true);
      } else {
        setLeftDisable(false);
      }
      ref.current.scrollLeft -= distance;
      setRightDisable(false);
    }
  }, 500);

  const handlePre = useCallback(handlePreThrottle, [handlePreThrottle]);

  const handleNextThrottle = throttle(() => {
    const elList = document.getElementsByClassName(styles.item_container);
    const distance = elList[0].clientWidth + 50;
    const max = elList.length * distance;
    if (ref.current && ref.current.scrollLeft < max) {
      if (
        ref.current.clientWidth + ref.current.scrollLeft + distance >=
        ref.current.scrollWidth
      ) {
        setRightDisable(true);
      } else {
        setRightDisable(false);
      }
      ref.current.scrollLeft += distance;

      setLeftDisable(false);
    }
  }, 500);
  const handleNext = useCallback(handleNextThrottle, [handleNextThrottle]);

  return (
    <div className={styles.container}>
      <div className={clsx("relative", styles.box_scroll)}>
        <div
          className={clsx(
            styles.left,
            "absolute top-0 bottom-0 left-0 z-50 m-auto cursor-pointer  hidden",
            leftDisable ? "opacity-0" : ""
          )}
          onClick={handlePre}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="23.6"
              transform="rotate(-180 24 24)"
              fill="black"
              stroke="#676767"
              stroke-width="0.8"
            />
            <path
              d="M29 32L18 24L29 16"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="bevel"
            />
          </svg>
        </div>

        <div
          className={clsx(
            styles.right,
            "absolute top-0  bottom-0 right-0 z-50 m-auto cursor-pointer hidden",
            rightDisable ? "opacity-0" : ""
          )}
          onClick={handleNext}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="23.6"
              fill="black"
              stroke="#676767"
              stroke-width="0.8"
            />
            <path
              d="M19 16L30 24L19 32"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="bevel"
            />
          </svg>
        </div>
        <div ref={ref} className={clsx(styles.box, "flex relative")}>
          <div
            className={clsx(styles.item1_hover, styles.item_container, item_bg)}
          >
            <div
              className={clsx(
                "relative flex flex-col justify-between",
                styles.item1,
                item_bg,
                styles.item
              )}
            >
              <div>
                <div className={clsx(styles.line, styles.line1)}></div>
                <div
                  className="flex flex-col"
                  style={{
                    gap: 16,
                  }}
                >
                  <div className={clsx(styles.title, "font-bold")}>
                    {data1.title}
                  </div>
                  <div>
                    {data1.label.map((l, i) => {
                      return (
                        <span key={i} className={clsx(styles.label)}>
                          {l}
                        </span>
                      );
                    })}
                  </div>
                  <div className={clsx(styles.desc, "text-xs")}>
                    {data1.desc}
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.footer,
                  "flex items-center justify-between"
                )}
              >
                <div
                  className={clsx("flex")}
                  style={{
                    gap: 25,
                  }}
                >
                  <div className={clsx("flex items-center")}>
                    <Image
                      src="/clock.svg"
                      alt="clock.svg"
                      width={14}
                      height={14}
                    />
                    <span className={styles.footer_text}>
                      {data1.hour} Hour
                    </span>
                  </div>
                  <div className={clsx("flex items-center")}>
                    <Image
                      src="/course.svg"
                      alt="course.svg"
                      width={14}
                      height={14}
                    />
                    <span className={styles.footer_text}>
                      {data1.course} Course
                    </span>
                  </div>
                </div>
                <div
                  className={clsx(
                    "flex items-center",
                    styles.completed_container
                  )}
                >
                  <Image src="/fly.svg" alt="fly.svg" width={20} height={20} />
                  <span className={styles.completed}>
                    {data1.completed} COMPLETED
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(styles.item2_hover, styles.item_container, item_bg)}
          >
            <div
              className={clsx(
                "relative flex flex-col justify-between",
                styles.item2,
                item_bg,
                styles.item
              )}
            >
              <div>
                <div
                  className="flex flex-col"
                  style={{
                    gap: 16,
                  }}
                >
                  <div className={clsx(styles.title, "font-bold")}>
                    {data2.title}
                  </div>
                  <div
                    className="flex item-center"
                    style={{
                      gap: 16,
                    }}
                  >
                    {data2.label.map((l, i) => {
                      return (
                        <span key={i} className={clsx(styles.label)}>
                          {l}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.item2_footer,
                  "flex items-center justify-between flex-col"
                )}
              >
                <div
                  className={clsx(
                    styles.footer_desc,
                    "flex items-center justify-between w-full "
                  )}
                >
                  <span>Signup</span>
                  <span>{data2.signup}</span>
                </div>
                <div
                  className={clsx(
                    styles.footer_desc,
                    "flex items-center justify-between w-full "
                  )}
                >
                  <span>Event</span>
                  <span>{data2.event}</span>
                </div>
                <div
                  className={clsx(
                    styles.footer_desc,
                    "flex items-center justify-between w-full "
                  )}
                >
                  <span>Grant size</span>
                  <span>{data2.grant_size}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(styles.item3_hover, styles.item_container, item_bg)}
          >
            <div
              className={clsx(
                "relative flex flex-col justify-between",
                styles.item3,
                item_bg,
                styles.item
              )}
            >
              <div>
                <div className={clsx(styles.line, styles.line3)}></div>
                <div
                  className="flex flex-col"
                  style={{
                    gap: 16,
                  }}
                >
                  <div className={clsx(styles.title, "font-bold")}>
                    {data3.title}
                  </div>
                  <div>
                    {data3.label.map((l, i) => {
                      return (
                        <span key={i} className={clsx(styles.label)}>
                          {l}
                        </span>
                      );
                    })}
                  </div>
                  <div className={clsx(styles.desc, "text-xs")}>
                    {data3.desc}
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.footer,
                  "flex items-center justify-between"
                )}
              >
                <div
                  className={clsx("flex")}
                  style={{
                    gap: 25,
                  }}
                >
                  <div className={clsx("flex items-center")}>
                    <Image
                      src="/clock.svg"
                      alt="clock.svg"
                      width={14}
                      height={14}
                    />
                    <span className={styles.footer_text}>
                      {data1.hour} Hour
                    </span>
                  </div>
                  <div className={clsx("flex items-center")}>
                    <Image
                      src="/course.svg"
                      alt="course.svg"
                      width={14}
                      height={14}
                    />
                    <span className={styles.footer_text}>
                      {data3.course} Course
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              styles.item4_hover,
              styles.item_container,
              styles.item4_container,
              item_bg
            )}
          >
            <div
              className={clsx(
                "relative flex flex-col justify-between",
                styles.item4,
                item_bg,
                styles.item
              )}
            >
              <div>
                <div className={clsx(styles.line, styles.line4)}></div>
                <Image
                  src="/card4_logo.svg"
                  alt="card4_logo.svg"
                  width={380}
                  height={238}
                />

                <div className={clsx(styles.title, "font-bold absolute")}>
                  {data4.title}
                </div>
              </div>
              <div
                className={clsx(
                  styles.footer,
                  "flex items-center justify-between absolute"
                )}
              >
                <div
                  className={clsx("flex")}
                  style={{
                    gap: 25,
                  }}
                >
                  <div className={clsx("flex items-center")}>
                    <Image
                      src="/clock.svg"
                      alt="clock.svg"
                      width={14}
                      height={14}
                    />
                    <span className={styles.footer_text}>
                      {data4.hour} Hour
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;
