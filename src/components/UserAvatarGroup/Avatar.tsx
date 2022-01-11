import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";

export interface IAvatar {}

export const Avatar = (props: { id: string }) => {
  const userById = useStoreState((state) => state.user.userById(props.id));
  const avatarInitials = useMemo(
    () =>
      userById.name?.includes(" ")
        ? userById.name
            ?.split(" ", 2)
            .map((name) => name[0])
            .join("")
        : userById.name?.[0],
    [userById]
  );
  return (
    <div
      key={props.id}
      className="w-8 h-8 text-sm flex justify-center items-center -mr-1 border-white bg-gray-300 rounded-full uppercase"
    >
      {avatarInitials}
    </div>
  );
};
