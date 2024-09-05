"use client";
import { useState, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import useProductData from "../hooks/useProductData";
import styles from "./home.module.css";
import Image from "next/image";

export default function Home() {
	const [filters, setFilters] = useState({});
	const { products, isLoading, hasMore, setPage } = useProductData(filters);

	const [sidebarVisible, setSidebarVisible] = useState(true);

	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible);
	};

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			if (hasMore) {
				setPage((prevPage) => prevPage + 1);
			}
		}
	};

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};

	// Add scroll event listener for infinite scrolling
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasMore]);

	return (
		<main className={styles.main}>
			<div className={styles.banner}>
				<h1>DISCOVER OUR PRODUCTS</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
			</div>
			<div className={styles.body}>
				<div className={styles.productsHead}>
					<div className={styles.itemsCount}>
						<strong>{products.length} ITEMS</strong>
					</div>

					<div className={styles.filterToggle}>
						<span
							className={styles.arrow}
							style={{
								transform: sidebarVisible
									? "rotate(45deg)"
									: "rotate(225deg)",
							}}
						></span>

						<button
							className={styles.hideFilter}
							onClick={toggleSidebar}
						>
							{sidebarVisible ? "HIDE FILTER" : "SHOW FILTER"}
						</button>
					</div>

					<div className={styles.sortOptions}></div>
				</div>
				<div className={styles.productsBody}>
					{sidebarVisible && (
						<FilterSidebar onFilterChange={handleFilterChange} />
					)}
					<div className={styles.productsGrid}>
						{products.map((el, i) => (
							<div key={i} className={styles.productItem}>
								<Image
									src={el.displayImage}
									alt={el.name}
									width={300}
									height={375}
									// layout="fill"
									// objectFit="cover"
								/>
								<h3>{el.name}</h3>
								<div>
									<p>price: {el.price}₹</p>
									<span>
										<svg
											width="22"
											height="20"
											viewBox="0 0 22 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.62 18.8096C11.28 18.9296 10.72 18.9296 10.38 18.8096C7.48 17.8196 1 13.6896 1 6.68961C1 3.59961 3.49 1.09961 6.56 1.09961C8.38 1.09961 9.99 1.97961 11 3.33961C12.01 1.97961 13.63 1.09961 15.44 1.09961C18.51 1.09961 21 3.59961 21 6.68961C21 13.6896 14.52 17.8196 11.62 18.8096Z"
												stroke="#292D32"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								</div>
							</div>
						))}
						{isLoading && <p>Loading more products...</p>}
					</div>
				</div>
			</div>
		</main>
	);
}
