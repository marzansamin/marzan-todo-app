/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import BoardInterface from "./BoardInterface"
import BoardTopBar from "./BoardTopBar"
import useStore from "../../store"
import { useEffect, useMemo, useState, useCallback } from "react"
import useApp from '../../hooks/useApp'
import AppLoader from '../../components/layouts/AppLoader'
import BoardNotReady from "./BoardNotReady"

const BoardScreen = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true);
  const [lastUpdated, setlastUpdated] = useState(null);
  const {boards, areBoardsFetched} = useStore();
  const {boardId} = useParams();
  const board = useMemo(() => boards.find(b => b.id===boardId), []);
  const {fetchBoard, deleteBoardInner} = useApp();
  const boardData = useMemo(() => data, [data]);
  
  const handleUpdateLastUpdated =  useCallback(() => setlastUpdated(new Date().toLocaleString('en-US')), []);

  const handleDeleteBoardInner = useCallback(async () => {
    if(!window.confirm("Do you want to delete this board?")) return;
    try{
      setloading(true);
      await deleteBoardInner(boardId);
    }catch(err){
      console.log(err);
      setloading(false);
    }
  }, []);

  const handleFetchBoard = async () => {
    try{
      const boardData = await fetchBoard(boardId);
      if(boardData){
        const {lastUpdated, tabs} = boardData
        setdata(tabs);
        setlastUpdated(lastUpdated.toDate().toLocaleString('en-US'));
      }
      setloading(false);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(!areBoardsFetched || !board) navigate('/boards');
    else handleFetchBoard();
  }, []);

  if(!board) return null;

  if(loading) return <AppLoader />

  if(!data) return <BoardNotReady />
  
  return (
    <>
      <BoardTopBar name={board.name} color={board.color} lastUpdated={lastUpdated} deleteBoardInner={handleDeleteBoardInner} />
      <BoardInterface boardData={boardData} boardId={boardId} updateLastUpdated={handleUpdateLastUpdated} />
    </>
  )
}

export default BoardScreen