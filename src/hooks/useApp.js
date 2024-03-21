/* eslint-disable no-unused-vars */
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase' //Firestore instance
import { getAuth } from 'firebase/auth'
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

const useApp = () => {
  const navigate = useNavigate();
  const {currentUser : {uid}} = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`); 
  const {boards, setBoards, addBoard, setToaster } = useStore();

  //Function to update the tasks--> adding tasks, drag and drop, edit, delete
  const updateBoardData = async(boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`)
    try{
      await updateDoc(docRef, {tabs, lastUpdated: serverTimestamp()})
    }catch(err){
      setToaster('Error updating the task');
      throw err;
    }
  }

  //Function to fetch the selected plan
  const fetchBoard = async(boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`)
    try{
      const doc = await getDoc(docRef);
      if(doc.exists){
        return doc.data();
      }else return null;
    }catch(err){
      setToaster('Error fetching the plan');
      throw err;
    }
  }

  //Function to create a new plan
  const createBoard = async ({name, color}) => {
    try{
      const doc = await addDoc(boardsColRef, {name, color, createdAt: serverTimestamp(),});
      addBoard({name, color, createdAt: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`})
    } catch(err){
      setToaster('Error creating the plan');
      throw err;
    }
  };

  //Function to fetch all the created plans
  const fetchBoards = async (setloading) => {
    try{
      const q = query(boardsColRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map(doc => ({
        ...doc.data(), 
        id:doc.id, 
        createdAt: `${doc.data().createdAt.toDate().toLocaleDateString()}, ${doc.data().createdAt.toDate().toLocaleTimeString()}`,
      }));
      setBoards(boards);
    } catch(err){
      setToaster('Error fetching the plans');
    } finally{
      if(setloading) setloading(false);
    }
  };

  // Function to edit a plan
  const updateBoard = async (boardId, newData) => {
    try{
      const boardRef = doc(db, `users/${uid}/boards/${boardId}`);
      await updateDoc(boardRef, newData);
      await fetchBoards();
    }catch (err) {
      setToaster('Error editing the plan');
      throw err;
    }
  };

  // Function to delete a plan
  const deleteBoard = async (boardId) => {
    try{
      const boardRef = doc(db, `users/${uid}/boards/${boardId}`);
      await deleteDoc(boardRef);
      fetchBoards();
    }catch (err) {
      setToaster('Error deleting the plan');
      throw err;
    }
  };

  // Function to delete a plan inner
  const deleteBoardInner = async (boardId) => {
    try{
      const docRef = doc(db, `users/${uid}/boards/${boardId}`);
      await deleteDoc(docRef);
      const tBoards = boards.filter(board => board.id !== boardId);
      setBoards(tBoards);
      navigate('/boards');
    }catch (err) {
      setToaster('Error deleting the plan');
      throw err;
    }
  };

  return { createBoard, fetchBoards, updateBoard, deleteBoard, fetchBoard, updateBoardData, deleteBoardInner };
};

export default useApp