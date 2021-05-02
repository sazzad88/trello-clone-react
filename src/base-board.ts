import { uuid } from "./utils";

export default {
  name: "worshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          id: uuid(),
          name: "first task",
          description: "",
          userAssigned: null,
        },
        {
          id: uuid(),
          name: "second task",
          description: "second task detail",
          userAssigned: null,
        },
        {
          id: uuid(),
          name: "third task",
          description: "",
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          id: uuid(),
          name: "first task",
          description: "",
          userAssigned: null,
        },
      ],
    },
    {
      name: "done",
      tasks: [
        {
          id: uuid(),
          name: "first task",
          description: "",
          userAssigned: null,
        },
      ],
    },
  ],
};
