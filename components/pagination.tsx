'use client'

import React, { useState } from 'react'
import { PostDate, PostExcerpt, PostTags, PostTitle } from './blog-parts'
import styles from '../styles/blog.module.scss'
import Mystyles from '../styles/mystyles.module.scss'
import { useStaticState } from '../lib/state-manage'

const renderData = (data) => {
  return (
    <div className={styles.template}>
      {data
        .map(post => {
        return (
          <div className={styles.post} key={post.Slug}>
            <PostDate post={post} />
            <PostTags post={post} />
            <PostTitle post={post} />
            <PostExcerpt post={post} />
            {/* <ReadMoreLink post={post} /> */}
          </div>
        )
      })}
    </div>
  )
}

const Pagination = ({ allItems, perpage }) => {
  const [currentPage, setCurrentPage] = useStaticState('currentPage')
  // const [currentPage, setcurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setitemsPerPage] = useState(perpage);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    const newCurrentPage = {...currentPage}
    newCurrentPage.page = Number(event.target.innerText)
    setCurrentPage(newCurrentPage);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage.page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage.page == number ? `${Mystyles.pagination_active}` : null}
        >
          <span className={Mystyles.pagination_link}>{number}</span>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    const newCurrentPage = {...currentPage}
    newCurrentPage.page = currentPage.page + 1
    setCurrentPage(newCurrentPage)

    if (currentPage.page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    const newCurrentPage = {...currentPage}
    newCurrentPage.page = currentPage.page -1
    setCurrentPage(newCurrentPage)

    if ((currentPage.page - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn =
      <li onClick={handleNextbtn}>
        <span className={Mystyles.pagination_link}> &hellip; </span>
      </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn =
      <li onClick={handlePrevbtn}>
        <span className={Mystyles.pagination_link}> &hellip; </span>
      </li>;
  }

  return (
    <>
      {renderData(currentItems)}
      <footer>
        <nav className={Mystyles.navpagination}>
          <ul className={Mystyles.pagination}>
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage.page == pages[0] ? true : false}
              >
                <span className={Mystyles.pagination_link}>＜</span>
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li>
              <button
                onClick={handleNextbtn}
                disabled={currentPage.page == pages[pages.length - 1] ? true : false}
              >
                <span className={Mystyles.pagination_link}>＞</span>
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default Pagination