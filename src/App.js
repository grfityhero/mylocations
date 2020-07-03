import React, { useState, useReducer } from "react"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./components/Categories/Categories"
import Editor from "./components/Editor/Editor"
import CategoriesContext from "./context/CategoriesContext.js"
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from "./Types/CategoriesTypes"

let storageState = localStorage.getItem("state")
let initialState

if (storageState) {
  initialState = JSON.parse(storageState)
} else {
  initialState = {
    categories: [{ name: "category-1" }, { name: "category-2" }],
    location: [
      {
        locationname: "Name1",
        address: "addr1",
        coordinates: "coordinates1",
        category: "category-1",
      },
      {
        locationname: "Name2",
        address: "addr1",
        coordinates: "coordinates1",
        category: "category-1",
      },
    ],
  }
}

function App() {
  const [showEditor, setshowEditor] = useState(false)
  const [activeCategory, setActiveCategory] = useState(-1)

  const reducer = (state, action) => {
    switch (action.type) {
      case ADD_ITEM: {
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...state.categories, { name: action.payload }],
            location: { ...state.location },
          })
        )
        return {
          ...state,
          categories: [...state.categories, { name: action.payload }],
          location: { ...state.location },
        }
      }
      case DELETE_ITEM: {
        console.log("delete item number ", activeCategory)
     
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [
              ...state.categories.filter(
                (item) => item !== state.categories[activeCategory]
              ),
            ],
            location: { ...state.location },
          })
        )
        return {
          ...state,
          categories: [
            ...state.categories.filter(
              (item) => item !== state.categories[activeCategory]
            ),
          ],
          location: { ...state.location },
        }
      }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CategoriesContext.Provider value={{ state, dispatch }}>
      <div className="App">
        {/* <Editor showEditor={true} /> */}
        <Navbar />
        <Editor showEditor={showEditor} setshowEditor={setshowEditor} />
        <Categories
          setshowEditor={setshowEditor}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </CategoriesContext.Provider>
  )
}

export default App
