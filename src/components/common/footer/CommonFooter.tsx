import { selector, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import styles from './CommonFooter.module.scss'
import { imageData } from '@/recoil/selectors/imageSelector'
import { pageState } from '@/recoil/atoms/pageState';
import { useEffect, useState } from 'react';
import { searchState } from '@/recoil/atoms/searchState';

function CommonFooter() {
  const imgSelector = useRecoilValueLoadable(imageData);
  const search = useRecoilValue(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0)
  }, [search])

  //페이지 리스트 UI 생성
  const newArr: number[] = new Array();
  for(let i=1; i<imgSelector.contents.total_pages; i++){
    newArr.push(i);
  }

  const length = newArr.length;
  const divide = Math.ceil(length/10);
 
  const res = [];

  for (let i = 0; i<divide; i++){
    res.push(newArr.splice(0, 10))
  }

  const setRes = () => {
    return res[step] && res[step].map((item:number, index:number) => {
      return (
        <button className={index === page - 1 - step * 10 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=>{moveToPage(item)}}>
          {item}
        </button>
      )
    })
  }

  const moveToPage = (selected : number) => {
    setPage(selected);
  }
  const moveToPrev = () => {
    if(step === 0) return;
    else {
      setStep(step -1)
      setPage(res[step-1][0])
    }
  }
  const moveToNext = () => {
    if(step < res[step].length - 2){
      setStep(step + 1);
      setPage(res[step + 1][0]);
    }else return;
  }

  return (
    <footer className={styles.footer}>
        <div className={styles.pagination}>
            <button className={styles.pagination__button} onClick={moveToPrev}>
                <img src="src/assets/icons/arrow-left.svg" alt="" />
            </button>
            {/* 변경될 UI 부분 */}
            {/* <span>1</span> */}
            { setRes() }
            <button className={styles.pagination__button} onClick={moveToNext}>
                <img src="src/assets/icons/arrow-right.svg" alt="" />
            </button>
        </div>
    </footer>
  )
}

export default CommonFooter