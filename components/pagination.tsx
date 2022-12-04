'use client'

import React, { useState } from 'react'
import { PostDate, PostExcerpt, PostTags, PostTitle } from './blog-parts'
import styles from '../styles/blog.module.scss'
import Mystyles from '../styles/mystyles.module.scss'

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
  const [currentPage, setcurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setitemsPerPage] = useState(perpage);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? `${Mystyles.active}` : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <>
      {renderData(currentItems)}
      <footer>
        {/* <div className={Mystyles.nextPageLink}> */}
        <ul className={Mystyles.pageNumbers}>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
            >
              ＜
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
              ＞
            </button>
          </li>
        </ul>
        {/* </div> */}
      </footer>
    </>
  );
}

export default Pagination