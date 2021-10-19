import "dayjs/locale/fr";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { useEffect, useState } from "react";

export function DateHour() {
  dayjs.locale("fr");
  dayjs.extend(updateLocale);

  dayjs.updateLocale("fr", {
    weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  });
  let now = dayjs();
  let nowF = now.format("ddd. DD MMM HH:mm:ss");

  const [date, setDate] = useState(nowF);

  function formatDate() {
    now = now.add(1, "second");
    nowF = now.format("ddd. DD MMM HH:mm:ss");
    setDate(nowF);
  }

  useEffect(() => {
    setInterval(formatDate, 1000);
  });

  return (
    <div className="date">
      <p>{date}</p>
    </div>
  );
}
