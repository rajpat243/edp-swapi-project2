import React from 'react';

const InfoCard = ({ info }) => {

  const styles = {
    info: {
      padding: '20px',
    },
    title: {
      padding: '20px',
      fontSize: '2rem',
      color: '#FFE81F', 
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '10px',
    },
    textSm: {
      fontSize: '0.875rem',
      color: '#666',
    },
    darkTextSm: {
      color: '#ccc',
    },
  };

  return (
    <div style={styles.info}>
      <h1 style={styles.title}>{info.name}</h1>
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <span style={styles.textSm}>
            Born: {info.birth_year}
          </span>
          <span style={styles.textSm}>
            Height: {info.height} cm
          </span>
          <span style={styles.textSm}>
            Mass: {info.mass} kg
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
