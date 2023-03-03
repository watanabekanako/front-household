import React from 'react'
import { CategoryDate } from '../CategoryDummyDate'
import CategoryStyle from "../styles/category/category.module.scss"

const Category = () => {
  return (
    <div className={CategoryStyle.categoryContainer}>
        <ul>
            {CategoryDate.map((category) => {
                return (
                    <li>{category.url}</li>
                )
            })}
        </ul>
    </div>
  )
}

export default Category
