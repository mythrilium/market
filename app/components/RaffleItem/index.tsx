import { Link } from "@remix-run/react";
import type { RaffleWithMatchingProducts } from "~/models/raffle.server";
import { getRaffleActivityStatus } from "~/utils/raffle";
import Button from "~/components/Button";
import Image from "~/components/Image";
import clsx from "clsx";
import { formatDateTime } from "~/utils/date";

export interface RaffleItemProps {
  raffle: RaffleWithMatchingProducts;
  currentDateTime: string;
  raffleEntryExists: boolean;
  disabled?: boolean;
}

export const raffleStatusClasses = {
  base: "bg-neutral-100 rounded py-1 px-2 mb-4 border-2 border-solid text-xs",
  status: {
    UPCOMING: "text-yellow-700 bg-yellow-300 border-yellow-500",
    ACTIVE: "text-green-700 bg-green-300 border-green-500",
    PAST: "text-red-700 bg-red-300 border-red-500",
    UNKNOWN: "text-neutral-700 bg-neutral-300 border-neutral-500",
  },
};

export default function RaffleItem({
  raffle,
  currentDateTime,
  raffleEntryExists,
  disabled = false,
  ...rest
}: RaffleItemProps) {
  const formattedStartDateTime = formatDateTime(raffle.startDateTime);

  const formattedEndDateTime = formatDateTime(raffle.endDateTime);

  let raffleStatus = getRaffleActivityStatus(
    raffle.startDateTime.toString(),
    raffle.endDateTime.toString(),
    currentDateTime
  );

  return (
    <div
      {...rest}
      className={clsx(
        "relative mb-12 flex flex-col items-center space-y-6 after:absolute after:bottom-0 after:left-0 after:top-24 after:-z-10  after:w-full after:rounded after:bg-gradient-to-b after:from-neutral-300 after:to-neutral-100 after:content-['']",
        disabled && "opacity-50"
      )}
    >
      <Image
        src={raffle.products[0].image}
        alt={raffle.name}
        className="h-full max-h-48"
      />
      <h2 className="whitespace-nowrap font-soehneBreit text-lg text-primary-500">
        {raffle.name}
      </h2>

      <span
        className={clsx(
          raffleStatusClasses.base,
          raffleStatus && raffleStatusClasses.status[raffleStatus]
        )}
      >
        {getRaffleActivityStatus(
          raffle.startDateTime.toString(),
          raffle.endDateTime.toString(),
          currentDateTime
        )}
      </span>
      <p className="text-sm">
        {formattedStartDateTime}–{formattedEndDateTime}
      </p>
      <p>From {raffle.products[0].formattedPrice}</p>
      <Link to={raffle.id}>
        <Button
          color={disabled ? "disabled" : "primary"}
          className="mb-2"
          disabled={disabled}
        >
          View Details
        </Button>
      </Link>
    </div>
  );
}
