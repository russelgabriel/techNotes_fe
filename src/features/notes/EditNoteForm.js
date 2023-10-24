import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

const EditNoteForm = ({ note }) => {
  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()

  const [deleteNote, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setCompleted(false)
      navigate('/dash/notes')
    }
  }, [isDelSuccess, isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)

  const onCompletedChanged = () => setCompleted(prev => !prev)

  const onSaveNoteClicked = async (e) => {
    if (title && text) {
      await updateNote({
        id: note.id,
        user: note.user,
        title,
        text,
        completed
      })
    }
  }

  const onDeleteNoteClicked = async (e) => {
    await deleteNote({
      id: note.id
    })
  }

  let canSave

  if (title && text && !isLoading) {
    canSave = true
  } else canSave = false

  const errClass = (isError || isDelError) ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className='form' onSubmit={e => e.preventDefault()}>

        <div className='form__title-row'>
          <h2>Edit Note</h2>

          <div className='form__action-buttons'>
            <button
              className='icon-button'
              title='Save'
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            <button
              className='icon-button'
              title='Delete'
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label className='form__label' htmlFor='title'>
          Title: 
        </label>
        <input 
          className={`form__input ${validTitleClass}`}
          id='title'
          name='title'
          type='text'
          autoComplete='off'
          value={title}
          onChange={onTitleChanged}
        />

        <label className='form__label' htmlFor='text'>
          Text: 
        </label>
        <input 
          className={`form__input ${validTextClass}`}
          id='text'
          name='text'
          type='text'
          autoComplete='off'
          value={text}
          onChange={onTextChanged}
        />

        <div className='form__row'>
          <label className='form__label' htmlFor='text'>
            COMPLETED: 
          </label>

            <input 
              className={`form__checkbox ${validTextClass}`}
              id='completed'
              name='completed'
              type='checkbox'
              autoComplete='off'
              checked={completed}
              onChange={onCompletedChanged}
            />
        </div>

      </form>
    </>
  )

  return content

}

export default EditNoteForm