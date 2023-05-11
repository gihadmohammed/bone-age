import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #555;
`;

const checkAnimation = keyframes`
  0% {
    stroke-dashoffset: 24;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckIcon = styled.svg`
  width: 5rem;
  height: 5rem;
  fill: none;
  stroke: #50C878;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: ${checkAnimation} 0.7s ease-in-out forwards;
`;

function Order() {
  return (
    <Container>
      <CheckIcon viewBox="0 0 24 24">
        <path d="M3 12l6 6L21 6" />
      </CheckIcon>
      <Title>Your order has been placed successfully!</Title>
      <Message>Thank you for shopping with us.</Message>
    </Container>
  );
}

export default Order;
