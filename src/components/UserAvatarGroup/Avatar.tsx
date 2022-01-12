import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";

export interface IAvatar {
  id: string;
  index: number;
}

const palettes = [
  "#ee9b00ff",
  "#ff4d6dff",
  "#0a9396ff",
  "#001219ff",
  "#bb3e03ff",
  "#005f73ff",
];

export const Avatar = (props: IAvatar) => {
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
  const backgroundColor = useMemo(
    () => palettes[props.index % palettes.length],
    [props.index]
  );
  return (
    <div
      style={{
        backgroundColor,
      }}
      className="w-8 h-8 text-sm text-white flex justify-center items-center -mr-1 border-white rounded-full uppercase font-medium"
    >
      {avatarInitials}
    </div>
  );
};
