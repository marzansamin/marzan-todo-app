import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase' //Firestore instance
import { updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import useStore from '../store';

const useApp = () => {
  const {currentUser : {uid}} = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`); 
  const {setBoards, addBoard} = useStore()

  //Function to create a new plan
  const createBoard = async ({name, color}) => {
    try{
      await addDoc(boardsColRef, {name, color, createdAt: serverTimestamp(),});
      addBoard({name, color, createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`})
    } catch(err){
      //Show the error message in toaster
      console.log(err);
      throw err;
    }
  };

  //Function to fetch all the created boards
  const fetchBoards = async (setloading) => {
    try{
      const q = query(boardsColRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map(doc => ({
        ...doc.data(), 
        id:doc.id, 
        createdAt: `${doc.data().createdAt.toDate().toLocaleDateString()} ${doc.data().createdAt.toDate().toLocaleTimeString()}`,
      }));
      setBoards(boards);
    } catch(err){
      //Show the error in the toaster
      console.log(err);
    } finally{
      if(setloading) setloading(false);
    }
  };

  // Function to update a board
  const updateBoard = async (boardId, newData) => {
    try {
      const boardRef = doc(db, `users/${uid}/boards/${boardId}`);
      await updateDoc(boardRef, newData);
      await fetchBoards();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete a board
  const deleteBoard = async (boardId) => {
    try {
      const boardRef = doc(db, `users/${uid}/boards/${boardId}`);
      await deleteDoc(boardRef);
      fetchBoards();
    } catch (err) {
      console.log(err);
    }
  };

  return { createBoard, fetchBoards, updateBoard, deleteBoard };
};

export default useApp