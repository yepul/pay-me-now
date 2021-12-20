import { Action, action, persist } from "easy-peasy";

export interface IGroup {
  id: string;
  name: string;
  users: string[];
  // phoneNumber: string,
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [{ name: "dummy-group", id: "abc", users: [] }],
    setGroups: action((state, group) => {
      state.groups.push(group);
    }),
  },
  {
    storage: "localStorage",
  }
);
