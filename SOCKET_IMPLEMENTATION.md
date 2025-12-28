# Socket.IO Backend Implementation Guide

## Required Socket Events

### Client → Server Events:

1. **join-conversation**
   - When: User opens chat
   - Payload: `recipientId` (string)
   - Action: Join user to conversation room

2. **send-message**
   - When: User sends message
   - Payload: `{ recipientId: string, content: string }`
   - Action: Broadcast message to recipient

3. **leave-conversation**
   - When: User closes chat
   - Payload: `recipientId` (string)
   - Action: Remove user from conversation room

---

### Server → Client Events:

1. **new-message**
   - When: New message received
   - Payload: 
   ```typescript
   {
     id: string,
     content: string,
     senderId: string,
     recipientId: string,
     fileUrl?: string,
     createdAt: string
   }
   ```

---

## Backend Implementation Example (Node.js):

```javascript
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.token; // Get from JWT

  // Join conversation
  socket.on('join-conversation', (recipientId) => {
    const roomId = [userId, recipientId].sort().join('-');
    socket.join(roomId);
  });

  // Send message
  socket.on('send-message', async ({ recipientId, content }) => {
    const roomId = [userId, recipientId].sort().join('-');
    
    // Save to database
    const message = await saveMessage({ senderId: userId, recipientId, content });
    
    // Broadcast to room
    io.to(roomId).emit('new-message', message);
  });

  // Leave conversation
  socket.on('leave-conversation', (recipientId) => {
    const roomId = [userId, recipientId].sort().join('-');
    socket.leave(roomId);
  });
});
```

---

## Testing

1. Install socket.io-client: `npm install socket.io-client`
2. Backend must have Socket.IO server running
3. Test connection in browser console
4. Check for "✅ Socket connected" message

---

## Notes

- REST API handles: Message history, file uploads, mark as read
- Socket.IO handles: Real-time message delivery only
- Fallback: If socket fails, REST API still works
