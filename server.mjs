import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const experts = [
  { advisorName: "John Doe", lastWorkedDate: "2023-01-15" },
  { advisorName: "Jane Smith", lastWorkedDate: "2022-06-20" },
  { advisorName: "Alice Johnson", lastWorkedDate: "2021-12-10" },
  { advisorName: "Daniel Oliveira", lastWorkedDate: "2025-01-10" }

];

const calculateRecency = (lastWorkedDate) => {
  const lastDate = new Date(lastWorkedDate);
  const currentDate = new Date();

  const yearDiff = currentDate.getFullYear() - lastDate.getFullYear();
  const monthDiff = currentDate.getMonth() - lastDate.getMonth();

  return yearDiff * 12 + monthDiff;
};

const processRecencyFilter = (recencyFilter) => {
  if (recencyFilter.startsWith(">")) {
    const months = parseInt(recencyFilter.slice(1), 10);
    return (recency) => recency > months;
  } else if (recencyFilter.startsWith("<")) {
    const months = parseInt(recencyFilter.slice(1), 10);
    return (recency) => recency < months;
  } else if (recencyFilter.startsWith("[") && recencyFilter.endsWith("]")) {
    const [min, max] = recencyFilter.slice(1, -1).split(",").map(num => parseInt(num, 10));
    return (recency) => recency >= min && recency <= max;
  }
  return null;
};

app.post('/experts', (req, res) => {
  const { filters } = req.body;
  
  if (!filters || !filters.recency || filters.recency.length === 0) {
    return res.status(400).json({ error: "Filter is mandatory." });
  }

  const recencyFilter = filters.recency[0];
  const filterFunction = processRecencyFilter(recencyFilter);
  
  if (!filterFunction) {
    return res.status(400).json({ error: "Filter is using an invalid format" });
  }

  const filteredExperts = experts
    .map(expert => {
      const recency = calculateRecency(expert.lastWorkedDate);
      return {
        advisorName: expert.advisorName,
        recency: recency
      };
    })
    .filter(expert => filterFunction(expert.recency));

  res.json({ experts: filteredExperts });
});

app.post('/all-experts', (req, res) => {
    res.json({ experts: experts });
  });

app.listen(3000, () => {
  console.log('Server running:  port 3000');
});

