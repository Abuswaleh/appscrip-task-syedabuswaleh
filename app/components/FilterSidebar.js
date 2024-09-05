"use client";
import React, { useState } from "react";
import styles from "./styles/filterSidebar.module.css";

// filter options based on the UI design
// const filterOptions = [
// 	{ name: "ideal for", options: ["men", "women", "Baby & Kids"] },
// 	{ name: "occasion", options: ["casual", "formal", "party", "wedding"] },
// 	{ name: "work", options: ["office", "factory", "construction"] },
// 	{ name: "fabric", options: ["cotton", "polyester", "silk", "wool"] },
// 	{ name: "segment", options: ["luxury", "basic", "mid-range"] },
// 	{ name: "suitable for", options: ["summer", "winter", "all seasons"] },
// 	{
// 		name: "raw Materials",
// 		options: ["organic cotton", "recycled polyester", "nylon"],
// 	},
// 	{ name: "pattern", options: ["solid", "striped", "printed", "checkered"] },
// ];

// filter options based on the api data
const filterOptions = [
	{
		name: "price",
		displayName: "Price",
		options: ["Under 500", "500-999", "1000-1499", "1500 and above"],
	},
	{
		name: "brand",
		displayName: "Brand",
		options: [
			"OFFICIAL DISNEY MERCHANDISE",
			"Bewakoof®",
			"OFFICIAL GARFIELD MERCHANDISE",
			"TISTABENE",
			"Campus Sutra",
			"7 Shores",
			"SAVVAO",
			"OFFICIAL NARUTO MERCHANDISE",
			"CHIMPAAANZEE",
			"OFFICIAL TOM & JERRY MERCHANDISE",
			"OFFICIAL CARTOON NETWORK MERCHANDISE",
			"Bewakoof Air® 1.0",
		],
	},
	{
		name: "subCategory",
		displayName: "Category",
		options: ["shirt", "jogger"],
	},
	{
		name: "size",
		displayName: "Size",
		options: ["S", "M", "L", "XL", "XXL"],
	},
	{
		name: "sellerTag",
		displayName: "Seller Tag",
		options: ["top rated", "best seller", "new arrival", "trending"],
	},
	{
		name: "color",
		displayName: "Color",
		options: [
			"BLACK",
			"WHITE",
			"GREY",
			"BROWN",
			"CREAM",
			"ORANGE",
			"BLUE",
			"GREEN",
			"PINK",
			"LAVENDER",
			"RED",
			"MULTICOLOR",
			"PURPLE",
			"YELLOW",
		],
	},
	{ name: "gender", displayName: "Gender", options: ["Men", "Women"] },
	{
		name: "ratings",
		displayName: "Ratings",
		options: ["1.0 - 1.9", "2.0 - 2.9", "3.0 - 3.9", "4.0 - 4.9", "5.0"],
	},
];

const FilterGroup = ({ data, selectedFilters, onChange, onUnselectAll }) => {
	const { displayName: name, options } = data;

	return (
		<div className={styles.filterGroup}>
			<div className={styles.groupHeader}>
				{name}
				<span className={styles.arrow}></span>
			</div>
			<div
				className={styles.unselectAll}
				onClick={() => onUnselectAll(name)}
			>
				Unselect all
			</div>
			{options.map((option, i) => (
				<div className={styles.filterOption} key={option}>
					<label>
						<input
							type="checkbox"
							name={option}
							checked={selectedFilters[name]?.includes(option)}
							onChange={(e) =>
								onChange(name, option, e.target.checked)
							}
						/>
						{option}
					</label>
				</div>
			))}
		</div>
	);
};

const FilterSidebar = () => {
	const [selectedFilters, setSelectedFilters] = useState({});

	const handleFilterChange = (groupName, option, isChecked) => {
		setSelectedFilters((prevState) => {
			const groupFilters = prevState[groupName] || [];

			if (isChecked) {
				return {
					...prevState,
					[groupName]: [...groupFilters, option],
				};
			} else {
				return {
					...prevState,
					[groupName]: groupFilters.filter((item) => item !== option),
				};
			}
		});
	};

	const handleUnselectAll = (groupName) => {
		setSelectedFilters((prevState) => ({
			...prevState,
			[groupName]: [],
		}));
	};

	return (
		<div className={styles.sidebar}>
			<div className={styles.customizable}>
				<input type="checkbox" id="customizable" name="customizable" />
				<label htmlFor="customizable">CUSTOMIZABLE</label>
			</div>

			{filterOptions.map((el, i) => (
				<FilterGroup
					data={el}
					key={el.name + i}
					selectedFilters={selectedFilters}
					onChange={handleFilterChange}
					onUnselectAll={handleUnselectAll}
				/>
			))}
		</div>
	);
};

export default FilterSidebar;
