# 037 Kanban Board: Columns

Based on customer feedback, we are going to pivot the task list to a [kanban board](https://en.wikipedia.org/wiki/Kanban_board) with three columns (todo, doing, done). This is a significant change. We will break this large change down into smaller stories to avoid breaking our product.

```
Given that tasks exist 
When they are displayed 
Then todo cards are displayed in a column to the left 
And doing cards are displayed in a column in the middle 
And done cards are displayed in a column to the right
```

Steps:
- The board class should display all cards horizontally.
- The cards with a status of todo should be grouped inside a div that has an id called todo-column.
- The cards with a status of doing should be grouped inside a div that has an id called doing-column.
- The cards with a status of done should be grouped inside a div that has an id called done-column.

Resources:
- https://www.w3schools.com/css/css3_flexbox_container.asp
- https://www.w3schools.com/tags/tag_div.asp
- https://www.w3schools.com/html/html_id.asp
