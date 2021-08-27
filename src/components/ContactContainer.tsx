import React from 'react';


interface ContainerProps {
  pageName: string;
}

const ContactContainer: React.FC<ContainerProps> = ({ pageName }) => {
  return (
    <div className="container">
      <strong>{pageName}</strong>
      <p>Contact Information - under construction</p>
    </div>
  );
};

export default ContactContainer;
