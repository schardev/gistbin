"use client";
import { getDuration } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";

const ExpireDate = ({ ttl }: { ttl: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [expired, setExpired] = useState(false);
  const startDate = new Date();
  const initialDuration = getDuration(new Date(Date.now() - ttl), startDate, {
    delimiter: ", ",
  });

  useEffect(() => {
    if (!ref.current) return;

    const target = ref.current;
    const intervalID = setInterval(() => {
      const endDate = new Date(Date.now() - ttl);

      if (endDate.getTime() <= startDate.getTime()) {
        target.textContent = getDuration(endDate, startDate, {
          delimiter: ", ",
        });
      } else {
        setExpired(true);
        clearInterval(intervalID);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {expired ? (
        <Dialog variant="error">
          Gist expired. It will be deleted once you leave/reload this page.
        </Dialog>
      ) : (
        <p className="text-foreground-muted">
          <span className="font-bold">Expires in</span>:{" "}
          <span ref={ref}>{initialDuration}</span>
        </p>
      )}
    </div>
  );
};

export default ExpireDate;
