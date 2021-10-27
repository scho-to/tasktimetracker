## Installation / How to Run

First of all, install all dependencies:
```bash
npm i
# or
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or define another port
npm run dev -- --port 8000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If you used another port, change 3000 to your port number.

## How to Use
1.1 Click the "Start" Button to start the timer, or click on the timer itself.
1.2 You can click the "Stop"-Button, to stop the timer, or click on the timer itels.
2. You can reset the Timer using the "Reset"-Button.
3. You can Book the Time by clicking the "Book Time" button.
3.1 Add some Bookings by clicking the "Book Time" button.
3.2 Fill in ALL form-fields, so the "Book this Task" button is usable. Note, that the already tracked Time until this point is taken into the "Tracked Time" field automatically. You can edit this if you please.

After that, you are back on the Page with the new Booking to be listed there now.

# Feedback
## Time needed for this project
start: 8:30, end: 15:50
time taken: 7:20h

## What did I like and didn't like?
I like this simple task to be done in different ways. I did use next.js which combines React in Frontend and Backend. My styling can be better. Could have been done with a Framework like Bootstrap or TailwindCSS.

## With which parts of your application are you satisfied?
I think my solution is pretty simple, KISS-styled. Simple enough to be understandable without any instructions. I did use a flat-file DB called [StormDB](https://github.com/TomPrograms/stormdb) by TomPrograms, which is my replacement for databases like mongodb or sqlite. However, a real DB could handle the app way better.

## Which would need improvement
- I could use a real database like mongodb. But I think it is harder to be testable and movable to other systems. That's why I chose the flatfile DB Stormdb.
- Fetched bookings are not sortable by now. They are sorted like FIFO. I could implement a sort method with a real database.
- Better stylings. I did use custom CSS for this task. I could use a framework to get a better looking in a small time amount.
- Deletion of bookings (CRUD)
- Making Searchbar more lazy. With thousands of entrys searched by every letter, this will be a problem.

# Notes
During buildtime of this project using npm, there were 17 high severity vulnerabilities. They couldn't be fixed using "npm audit fix -f".

It might get fixed, if you run following:
```bash
npm i react@latest react-dom@latest stormdb@latest next@latest
```

Then use
```bash
npm run dev
```
to start the project on default port.

## License
MIT