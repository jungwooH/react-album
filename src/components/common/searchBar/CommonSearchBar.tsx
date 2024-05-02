import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchState } from '@/recoil/atoms/searchState';
import { pageState } from '@/recoil/atoms/pageState';

function CommonSearchBar() {
  const [search, setSearch] = useRecoilState(searchState)
  const [page, setPage] = useRecoilState(pageState)
  const [text, setText] = useState('');
  const onChange = (event) => {
    setText(event.target.value);
  }
  const onSearch = () => {
    fn_search();
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === "Enter"){
      fn_search();
    }
  }
  const fn_search = () => {
    if(text === "") setSearch('Korea');
    else setSearch(text);
    setPage(1);
  }

  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar__search}>
            <input type="text" placeholder='찾으실 이미지를 검색하세요.' className={styles.searchBar__search__input} value={text} onChange={onChange} onKeyDown={handleKeyDown} />
            <img src="src/assets/icons/search.svg" alt="" onClick={onSearch} />
        </div>
    </div>
  )
}

export default CommonSearchBar