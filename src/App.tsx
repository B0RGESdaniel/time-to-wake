import { useState } from "react";
import { IoIosCloud, IoMdMoon, IoIosSunny, IoIosAlarm } from "react-icons/io";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

function App() {
  const [bedtime, setBedtime] = useState("23:00");
  const [waketime, setWaketime] = useState("07:00");

  const clouds = [
    { position: "1/12", size: 90, delay: "-5s" },
    { position: "1/5", size: 80, delay: "8s" },
    { position: "1/3", size: 100, delay: "0s" },
    { position: "3/6", size: 80, delay: "10s" },
    { position: "2/3", size: 120, delay: "-10s" },
    { position: "10/12", size: 70, delay: "2s" },
  ];

  function calcWakeTimeAndHoursOfSleep() {
    if (!bedtime || !waketime) return;

    const [bHours, bMinutes] = bedtime.split(":");
    const [wHours, wMinutes] = waketime.split(":");

    const bedtimeDate = dayjs({ hour: bHours, minute: bMinutes });
    const waketimeDate = dayjs({ hour: wHours, minute: wMinutes });

    const waketimeIsBeforeBedtime = waketimeDate.isBefore(bedtimeDate);
    const finalWaketimeDate = waketimeIsBeforeBedtime
      ? waketimeDate.add(1, "day")
      : waketimeDate;

    const minutesOfSleep = finalWaketimeDate.diff(bedtimeDate, "minutes");

    const ciclesOfSleep = Math.floor(minutesOfSleep / 90);

    if (ciclesOfSleep < 1) return;

    const recommendedMinutesOfSleep = ciclesOfSleep * 90;

    const rawRecommendedWaketime = bedtimeDate.add(
      recommendedMinutesOfSleep,
      "minutes"
    );

    const rawHoursOffSleep = rawRecommendedWaketime.diff(
      bedtimeDate,
      "hours",
      true
    );

    const intHours = Math.floor(rawHoursOffSleep);

    const minutesLeft = Math.round((rawHoursOffSleep - intHours) * 60);

    const hoursOfSleep = `${intHours} hours${
      minutesLeft ? ` and ${minutesLeft} minutes` : ""
    } of sleep`;

    const recommendedWaketime = rawRecommendedWaketime.format("HH:mm");

    return { recommendedWaketime, hoursOfSleep };
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-sky-300">
      {clouds.map((cloud, index) => (
        <IoIosCloud
          key={index}
          className={`absolute top-${cloud.position} text-white animate-cloud-loop`}
          style={{ animationDelay: cloud.delay }}
          size={cloud.size}
        />
      ))}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="bg-white flex items-center justify-center flex-col px-8 py-6 rounded-2xl gap-6 shadow-2xl">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 items-center">
              <IoMdMoon size={27} className="text-blue-900" />
              <h1 className="text-2xl font-bold text-blue-500">Time to wake</h1>
              <IoIosSunny size={35} className="text-yellow-500" />
            </div>
            <span className="text-slate-400 text-xs text-center text-wrap">
              Respecting your sleep cicles <br />
              (mininum of 1 hour and 30 minutes)
            </span>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex items-center justify-center flex-col gap-2">
              <span className="text-sm text-slate-500">Bed time</span>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="rounded-[8px] max-w-[100px] px-5 py-2 text-center inset-shadow-slate-500 inset-shadow-sm text-slate-600 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
            <div className="flex items-center flex-col gap-2">
              <span className="text-sm text-slate-500">Get up time</span>
              <input
                type="time"
                value={waketime}
                onChange={(e) => setWaketime(e.target.value)}
                className="rounded-[8px] max-w-[100px] px-5 py-2 text-center inset-shadow-slate-500 inset-shadow-sm text-slate-600 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-4 min-h-[138px]">
            <h3 className="text-slate-500 font-medium">
              Best time to wake up:
            </h3>
            <div className="flex flex-col items-center justify-center gap-1 mb-2">
              {calcWakeTimeAndHoursOfSleep()?.recommendedWaketime ? (
                <>
                  <h2 className="text-4xl font-bold text-slate-600">
                    {calcWakeTimeAndHoursOfSleep()?.recommendedWaketime}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {calcWakeTimeAndHoursOfSleep()?.hoursOfSleep}
                  </span>
                </>
              ) : (
                <IoIosAlarm size={90} className="text-slate-200" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
