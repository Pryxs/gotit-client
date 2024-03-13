import './styles.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Content, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Icon } from '../Icon'
import { bold, clean, code, h1, h2, h3, italic, list, ordered, paragraph, strike } from 'assets'

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className='toolbar'>
            <div>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <Icon svg={bold} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <Icon svg={italic} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <Icon svg={strike} />
                </button>
            </div>

            <div>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <Icon svg={paragraph} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <Icon svg={h1} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <Icon svg={h2} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <Icon svg={h3} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <Icon svg={code} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <Icon svg={list} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <Icon svg={ordered} />
                </button>
            </div>
            {/* <button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
            >
                violet
            </button> */}
            <div>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    <Icon svg={clean} />
                </button>
            </div>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, 
        },
    }),
]

type TiptapEditorProps = {
    content: Content;
    onUpdate: (content: Content) => void;
}

export const TiptapEditor:React.FC<TiptapEditorProps> = ({ content, onUpdate }) => {

    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} onUpdate={(tiptap) => onUpdate(tiptap.editor.getHTML())}><div/></EditorProvider>
    )
}