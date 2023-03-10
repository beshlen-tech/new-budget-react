import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";

import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import ModalEdit from "./components/ModalEdit";

import EntryLines from "./components/EntryLines";

function App() {
	const [entries, setEntries] = useState(initialEntires);
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");
	const [isExpense, setIsExpense] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [entryId, setEntryId] = useState();
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (!isOpen && entryId) {
			const index = entries.findIndex((entry) => entry.id === entryId);
			const newEntries = [...entries];
			newEntries[index].description = description;
			newEntries[index].value = value;
			newEntries[index].isExpense = isExpense;
			setEntries(newEntries);
			resetEntry();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	useEffect(() => {
		let totalIncome = 0;
		let totalExpense = 0;
		entries.map((entry) => {
			if (entry.isExpense) {
				return (totalExpense += entry.value);
			}
			return (totalIncome += entry.value);
		});
		setTotal(totalIncome - totalExpense);
		setExpenseTotal(totalExpense);
		setIncomeTotal(totalIncome);
	}, [entries]);

	const deleteEntry = (id) => {
		const result = entries.filter((entry) => entry.id !== id);
		setEntries(result);
	};

	const editEntry = (id) => {
		if (id) {
			const index = entries.findIndex((entry) => entry.id === id);
			const entry = entries[index];
			setEntryId(id);
			setDescription(entry.description);
			setValue(entry.value);
			setIsExpense(entry.isExpense);
			setIsOpen(true);
		}
	};

	const addEntry = () => {
		const newEntry = entries.concat({
			id: entries.length + 1,
			description: description,
			value: value,
			isExpense: isExpense,
		});

		setEntries(newEntry);
		resetEntry();
	};
	const resetEntry = () => {
		setDescription("");
		setValue("");
		setIsExpense(true);
	};
	return (
		<Container>
			<MainHeader title="Budget" />
			<DisplayBalance size="small" title="Your Balance:" value={total} />
			<DisplayBalances expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
			<MainHeader title="History" type="h3" />

			<EntryLines
				entries={entries}
				deleteEntry={deleteEntry}
				editEntry={editEntry}
			/>

			<MainHeader title="Add new transaction" type="h3" />
			<NewEntryForm
				addEntry={addEntry}
				description={description}
				setDescription={setDescription}
				value={value}
				setValue={setValue}
				isExpense={isExpense}
				setIsExpense={setIsExpense}
			/>
			<ModalEdit
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				addEntry={addEntry}
				description={description}
				setDescription={setDescription}
				value={value}
				setValue={setValue}
				isExpense={isExpense}
				setIsExpense={setIsExpense}
			/>
		</Container>
	);
}

export default App;

var initialEntires = [
	{
		id: 1,
		description: "Work income",
		value: 1000.0,
		isExpense: false,
	},
	{
		id: 2,
		description: "Water bill",
		value: 20.0,
		isExpense: true,
	},
	{
		id: 3,
		description: "Rent",
		value: 200.0,
		isExpense: true,
	},
	{
		id: 4,
		description: "Power bill",
		value: 50.0,
		isExpense: true,
	},
];
