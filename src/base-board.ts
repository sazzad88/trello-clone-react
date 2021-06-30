import { uuid } from "./utils";

export default {
  columns: [
    {
      name: "Todo List",
      id: uuid(),
      tasks: [
        {
          name: "First Task",
          slug: "first-task",
          description: "",
        },
        {
          name: "Second task",
          slug: "second-task",
          description: "second task detail",
        },
        {
          name: "third task",
          slug: "third-task",
          description: "",
        },
      ],
    },
  ],
};
