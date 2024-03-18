import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { db } from '../firebase' //Firestore instance
import { getAuth } from 'firebase/auth'
import useStore from '../store';

const useApp = () => {
  const {currentUser : {uid}} = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`); 
  const {setBoards} = useStore()

  //Function to create a new plan
  const createBoard = async ({name, color}) => {
    
    try{
      await addDoc(boardsColRef, {name, color, createdAt: serverTimestamp(),});
    } catch(err){
      //Show the error message in toaster
      console.log(err);
      throw err;
    }
  };

  //Function to fetch all the created boards
  const fetchBoards = async (setloading) => {
    try{
      const querySnapshot = await getDocs(boardsColRef);
      const boards = querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id}));

      setBoards(boards);
    } catch(err){
      //Show the error in the toaster
      console.log(err);
    } finally{
      if(setloading) setloading(false);
    }
  }

  return { createBoard, fetchBoards };
};

export default useApp