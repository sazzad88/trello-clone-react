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
          activity: [],
          comments: [],
        },
        {
          name: "Second task",
          slug: "second-task",
          description: "second task detail",
          activity: [],
          comments: [],
        },
        {
          name: "third task",
          slug: "third-task",
          description: "",
          activity: [],
          comments: [],
        },
      ],
    },
  ],
};
