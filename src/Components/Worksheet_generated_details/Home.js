import React, { useState, useEffect } from 'react';
import ObservationForm from './ObservationForm';
import { db, auth } from '../FireBase/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, where, getDocs, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { saveAs } from 'file-saver';
import HTMLDocx from 'html-docx-js/dist/html-docx';
import './Home.css';

const Home = () => {
  const [detailsList, setDetailsList] = useState([]);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState('current');
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [editingTableId, setEditingTableId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchHistory(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } else {
        setUser(null);
        setHistory([]);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchHistory = async (userId) => {
    const q = query(collection(db, "tables"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const historyData = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data().detailsList }));
    setHistory(historyData);
  };

  const handleDetailsGenerated = (data) => {
    setDetailsList(prevDetailsList => [...prevDetailsList, data]);
  };

  const handleSaveTable = async () => {
    try {
      if (editingTableId) {
        await updateDoc(doc(db, "tables", editingTableId), {
          detailsList,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "tables"), {
          detailsList,
          createdAt: serverTimestamp(),
          userId: user.uid
        });
      }
      setDetailsList([]);
      setEditingTableId(null);
      fetchHistory(user.uid);
      setView('history');
    } catch (e) {
      console.error("Error saving table: ", e);
    }
  };

  const handleEditTable = (tableId, tableData) => {
    setEditingTableId(tableId);
    setDetailsList(tableData);
    setView('current');
  };

  const handleDeleteTable = async (tableId) => {
    try {
      await deleteDoc(doc(db, "tables", tableId));
      fetchHistory(user.uid);
    } catch (e) {
      console.error("Error deleting table: ", e);
    }
  };

  const handleDownloadTable = (tableData) => {
    const tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Observation</th>
            <th>Element</th>
            <th>Legal Standards</th>
            <th>Professional Recommendation</th>
            <th>Risk Level</th>
            <th>Risk Rating</th>
          </tr>
        </thead>
        <tbody>
          ${tableData.map(details => `
            <tr>
              <td>${details.observation}</td>
              <td>${details.element}</td>
              <td>${details.legalStandard_Name}: ${details.legalStandard_sectionNumber}</td>
              <td>${details.professionalRecommendation}</td>
              <td>${details.riskLevel}</td>
              <td>${details.riskRating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    const blob = HTMLDocx.asBlob(tableHTML);
    saveAs(blob, 'table.docx');
  };

  return (
    <div className="container">
      <h1>Welcome, {userName}</h1>
      <h2>Safety Audit Observation</h2>
      <button onClick={() => setView('current')}>Current Task</button>
      <button onClick={() => setView('history')}>History</button>
      {view === 'current' && (
        <>
          <ObservationForm onDetailsGenerated={handleDetailsGenerated} />
          {detailsList.length > 0 && (
            <div>
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Observation</th>
                    <th>Element</th>
                    <th>Legal Standards</th>
                    <th>Professional Recommendation</th>
                    <th>Risk Level</th>
                    <th>Risk Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsList.map((details, index) => (
                    <tr key={index}>
                      <td>{details.observation}</td>
                      <td>{details.element}</td>
                      <td>{`${details.legalStandard_Name}: ${details.legalStandard_sectionNumber}`}</td>
                      <td>{details.professionalRecommendation}</td>
                      <td>{details.riskLevel}</td>
                      <td>{details.riskRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleSaveTable}>{editingTableId ? 'Update Table' : 'Save Table'}</button>
            </div>
          )}
        </>
      )}
      {view === 'history' && (
        <div>
          {history.length > 0 ? (
            history.map((table, index) => (
              <div key={index}>
                <h2>Table {index + 1}</h2>
                <table className="details-table">
                  <thead>
                    <tr>
                      <th>Observation</th>
                      <th>Element</th>
                      <th>Legal Standards</th>
                      <th>Professional Recommendation</th>
                      <th>Risk Level</th>
                      <th>Risk Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.data.map((details, subIndex) => (
                      <tr key={subIndex}>
                        <td>{details.observation}</td>
                        <td>{details.element}</td>
                        <td>{`${details.legalStandard_Name}: ${details.legalStandard_sectionNumber}`}</td>
                        <td>{details.professionalRecommendation}</td>
                        <td>{details.riskLevel}</td>
                        <td>{details.riskRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => handleEditTable(table.id, table.data)}>Edit</button>
                <button onClick={() => handleDeleteTable(table.id)}>Delete</button>
                <button onClick={() => handleDownloadTable(table.data)}>Download</button>
              </div>
            ))
          ) : (
            <p>No history available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
