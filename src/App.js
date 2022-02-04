import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import "./App.css";
import ImageCard from "./components/image";
import Modal from "./components/modal";

function App() {
  const [state, setState] = useState({
    items: [],
    view: [],
    limit: 12,
    albumId: null,
    modal: null,
  });
  const [modalVisability, setModalVisablity] = useState(false);

  useEffect(() => getPhotos(), [state.albumId]);
  useEffect(() => {
    const skip = state.limit * (state.page - 1);
    setState({
      ...state,
      view: [...state.items.slice(skip, skip + state.limit)],
    });
  }, [state.page, state.items]);

  const callbacks = {
    handleChangePage: (e) => {
      const page = +e.target.innerText;
      setState({ ...state, page });
    },
    handleChangeAlbum: (e) => {
      setState({ ...state, albumId: e.target.value });
    },
    handleClickCard: (item) => {
      setState({ ...state, modal: item });
      setModalVisablity(true);
    },
  };

  const getPhotos = async () => {
    try {
      const response = await fetch(
        "http://jsonplaceholder.typicode.com/photos"
      );
      const json = await response.json();
      if (state.albumId) {
        const filtered = json.filter(
          (item) => +item.albumId === +state.albumId
        );
        setState({ ...state, items: filtered, page: 1 });
      } else {
        setState({ ...state, items: json, page: 1 });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="App">
      <header></header>
      <main>
        <div className="Filter">
          <div className="Filter__Item">
            <span className="Filter__Name">По ID альбома:</span>
            <input
              onChange={callbacks.handleChangeAlbum}
              type="number"
              min={0}
              placeholder="AlbumID"
            ></input>
          </div>
        </div>
        <div className="Table">
          {state.view.map((item) => (
            <ImageCard
              item={item}
              key={item.id}
              onClick={callbacks.handleClickCard}
            />
          ))}
        </div>
        <div className="PaginationWrapper">
          <Stack spacing={2}>
            <Pagination
              count={Math.floor(state.items?.length / state.limit)}
              onChange={callbacks.handleChangePage}
            />
          </Stack>
        </div>
        {state.modal && (
          <Modal
            modalData={state.modal}
            handleClose={() => setModalVisablity(false)}
            open={modalVisability}
          />
        )}
      </main>
    </div>
  );
}

export default App;
