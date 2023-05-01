import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#101010',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ edit, open, handleClose, editedTask, setEditedTask }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-xl" sx={style}>
          <div className='flex flex-col gap-y-2'>
            <h2 className='text-xl pb-2'>Edit Task</h2>
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  edit(editedTask.task, editedTask.id);
                  setEditedTask({ task: '', id: '' });
                  handleClose()
                }
              }}
              value={editedTask.task}
              onChange={(e) => setEditedTask({ task: e.currentTarget.value, id: editedTask.id })}
              placeholder="Edit Your Task"
              className="bg-[#606060] focus:border-[#e3e3e3] rounded-lg px-2 border border-[#202020] h-12" autoFocus />
            <div className='flex justify-center gap-2 items-center'>
              <button onClick={() => { handleClose(); setEditedTask({ task: '', id: '' }) }} className='w-full rounded-lg bg-red-600 py-2 text-lg'>Cancel</button>
              <button onClick={() => { edit(editedTask.task, editedTask.id); setEditedTask({ task: '', id: '' }); handleClose() }} className='w-full rounded-lg bg-blue-600 py-2 text-lg'>Edit</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
