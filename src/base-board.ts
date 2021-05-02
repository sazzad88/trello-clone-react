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
        },
        {
          id: uuid(),
          name: "second task",
          description: "second task detail",
        },
        {
          id: uuid(),
          name: "third task",
          description: "",
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
        },
      ],
    },
  ],
};
