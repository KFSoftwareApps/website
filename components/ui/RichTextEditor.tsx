"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "İçeriğinizi buraya yazın...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] px-4 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Görsel URL:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="border-b border-gray-100 bg-gray-50 p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={editor.isActive("link") ? "bg-gray-200" : ""}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} className="min-h-[300px] p-4" />
    </div>
  );
}
