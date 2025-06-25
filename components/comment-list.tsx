"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Heart, MoreHorizontal, Edit, Trash2, Flag, Reply, Check, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentAuthor {
  id: string
  name: string
  username: string
  avatar: string
  level?: string
}

interface Comment {
  id: string
  author: CommentAuthor
  content: string
  timestamp: string
  parentId: string | null
  likes: number
  isLiked: boolean
  isEdited: boolean
  editedAt?: string
}

interface CommentListProps {
  comments: Comment[]
  currentUser: CommentAuthor | null
  onAddComment: (content: string, parentId: string | null) => void
  onEditComment: (commentId: string, content: string) => void
  onDeleteComment: (commentId: string) => void
  onLikeComment: (commentId: string) => void
  onReportComment: (commentId: string) => void
}

export default function CommentList({
  comments,
  currentUser,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onReportComment,
}: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)

  // Sort and organize comments into hierarchy
  const topLevelComments = comments
    .filter((comment) => !comment.parentId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  const getReplies = (parentId: string): Comment[] => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date()
    const commentTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - commentTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "gerade eben"
    if (diffInMinutes < 60) return `vor ${diffInMinutes} Min`
    if (diffInMinutes < 1440) return `vor ${Math.floor(diffInMinutes / 60)} Std`
    return `vor ${Math.floor(diffInMinutes / 1440)} Tag${Math.floor(diffInMinutes / 1440) > 1 ? "en" : ""}`
  }

  const handleReply = (parentId: string | null) => {
    setReplyingTo(parentId)
    setEditingComment(null)
  }

  const handleEdit = (commentId: string) => {
    setEditingComment(commentId)
    setReplyingTo(null)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  const handleCancelEdit = () => {
    setEditingComment(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          Kommentare ({comments.length})
        </h3>
      </div>

      {/* New Comment Form */}
      {currentUser && (
        <NewCommentForm
          user={currentUser}
          onSubmit={(content) => onAddComment(content, null)}
          placeholder="Teile deine Gedanken zu dieser Erfahrung..."
          buttonText="Kommentieren"
        />
      )}

      {/* Comments List */}
      {topLevelComments.length > 0 ? (
        <div className="space-y-4">
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
              currentUser={currentUser}
              isReplying={replyingTo === comment.id}
              isEditing={editingComment === comment.id}
              onReply={() => handleReply(comment.id)}
              onEdit={() => handleEdit(comment.id)}
              onCancelReply={handleCancelReply}
              onCancelEdit={handleCancelEdit}
              onAddComment={onAddComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
              onLikeComment={onLikeComment}
              onReportComment={onReportComment}
              formatTimeAgo={formatTimeAgo}
              getReplies={getReplies}
              level={0}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-zinc-800 border-zinc-600">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-white mb-2">Noch keine Kommentare</h4>
            <p className="text-zinc-400 mb-4">Sei der erste, der seine Gedanken zu dieser Erfahrung teilt!</p>
            {!currentUser && (
              <p className="text-sm text-zinc-500">
                <Button variant="link" className="text-cyan-400 p-0 h-auto">
                  Melde dich an
                </Button>
                , um zu kommentieren
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface CommentItemProps {
  comment: Comment
  replies: Comment[]
  currentUser: CommentAuthor | null
  isReplying: boolean
  isEditing: boolean
  onReply: () => void
  onEdit: () => void
  onCancelReply: () => void
  onCancelEdit: () => void
  onAddComment: (content: string, parentId: string | null) => void
  onEditComment: (commentId: string, content: string) => void
  onDeleteComment: (commentId: string) => void
  onLikeComment: (commentId: string) => void
  onReportComment: (commentId: string) => void
  formatTimeAgo: (timestamp: string) => string
  getReplies: (parentId: string) => Comment[]
  level: number
}

function CommentItem({
  comment,
  replies,
  currentUser,
  isReplying,
  isEditing,
  onReply,
  onEdit,
  onCancelReply,
  onCancelEdit,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onReportComment,
  formatTimeAgo,
  getReplies,
  level,
}: CommentItemProps) {
  const isOwnComment = currentUser?.id === comment.author.id
  const maxNestingLevel = 3 // Prevent infinite nesting

  return (
    <div className={`${level > 0 ? "ml-6 pl-4 border-l-2 border-zinc-700" : ""}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white text-sm">{comment.author.name}</span>
            <span className="text-xs text-zinc-500">@{comment.author.username}</span>
            {comment.author.level && (
              <Badge variant="secondary" className="bg-zinc-700 text-zinc-300 text-xs">
                {comment.author.level}
              </Badge>
            )}
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-500">{formatTimeAgo(comment.timestamp)}</span>
            {comment.isEdited && (
              <>
                <span className="text-xs text-zinc-500">•</span>
                <span
                  className="text-xs text-zinc-500"
                  title={`Bearbeitet ${comment.editedAt ? formatTimeAgo(comment.editedAt) : ""}`}
                >
                  bearbeitet
                </span>
              </>
            )}
          </div>

          {/* Comment Text or Edit Form */}
          {isEditing ? (
            <EditCommentForm
              initialContent={comment.content}
              onSave={(content) => {
                onEditComment(comment.id, content)
                onCancelEdit()
              }}
              onCancel={onCancelEdit}
            />
          ) : (
            <div className="text-sm text-zinc-300 leading-relaxed mb-2 whitespace-pre-wrap">{comment.content}</div>
          )}

          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex items-center gap-4 text-xs">
              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeComment(comment.id)}
                className={`h-auto p-1 hover:bg-zinc-800 ${
                  comment.isLiked ? "text-red-400" : "text-zinc-500 hover:text-red-400"
                }`}
                aria-label={`${comment.isLiked ? "Unlike" : "Like"} comment`}
              >
                <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                <span>{comment.likes}</span>
              </Button>

              {/* Reply Button */}
              {currentUser && level < maxNestingLevel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReply}
                  className="h-auto p-1 text-zinc-500 hover:text-cyan-400 hover:bg-zinc-800"
                  aria-label="Reply to comment"
                >
                  <Reply className="w-3 h-3 mr-1" />
                  <span>Antworten</span>
                </Button>
              )}

              {/* More Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-zinc-500 hover:text-white hover:bg-zinc-800"
                    aria-label="More actions"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-zinc-800 border-zinc-600">
                  {isOwnComment ? (
                    <>
                      <DropdownMenuItem onClick={onEdit} className="text-zinc-300 hover:text-white hover:bg-zinc-700">
                        <Edit className="w-3 h-3 mr-2" />
                        Bearbeiten
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-zinc-700"
                      >
                        <Trash2 className="w-3 h-3 mr-2" />
                        Löschen
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => onReportComment(comment.id)}
                      className="text-zinc-300 hover:text-white hover:bg-zinc-700"
                    >
                      <Flag className="w-3 h-3 mr-2" />
                      Melden
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Reply Form */}
          {isReplying && currentUser && (
            <div className="mt-3">
              <NewCommentForm
                user={currentUser}
                onSubmit={(content) => {
                  onAddComment(content, comment.id)
                  onCancelReply()
                }}
                onCancel={onCancelReply}
                placeholder={`Antwort an @${comment.author.username}...`}
                buttonText="Antworten"
                compact
              />
            </div>
          )}

          {/* Nested Replies */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  replies={getReplies(reply.id)}
                  currentUser={currentUser}
                  isReplying={false}
                  isEditing={false}
                  onReply={() => {}}
                  onEdit={() => {}}
                  onCancelReply={() => {}}
                  onCancelEdit={() => {}}
                  onAddComment={onAddComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                  onReportComment={onReportComment}
                  formatTimeAgo={formatTimeAgo}
                  getReplies={getReplies}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NewCommentFormProps {
  user: CommentAuthor
  onSubmit: (content: string) => void
  onCancel?: () => void
  placeholder?: string
  buttonText?: string
  compact?: boolean
}

function NewCommentForm({
  user,
  onSubmit,
  onCancel,
  placeholder = "Schreibe einen Kommentar...",
  buttonText = "Kommentieren",
  compact = false,
}: NewCommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content.trim())
      setContent("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Card className="bg-zinc-800 border-zinc-600">
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="bg-zinc-900 border-zinc-600 text-white placeholder:text-zinc-400 resize-none"
              rows={compact ? 2 : 3}
              maxLength={1000}
            />

            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-500">{content.length}/1000 • Strg+Enter zum Senden</div>

              <div className="flex gap-2">
                {onCancel && (
                  <Button variant="ghost" size="sm" onClick={onCancel} className="text-zinc-400 hover:text-white">
                    <X className="w-4 h-4 mr-1" />
                    Abbrechen
                  </Button>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim() || isSubmitting}
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? "Wird gesendet..." : buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface EditCommentFormProps {
  initialContent: string
  onSave: (content: string) => void
  onCancel: () => void
}

function EditCommentForm({ initialContent, onSave, onCancel }: EditCommentFormProps) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) return

    setIsSaving(true)
    try {
      await onSave(content.trim())
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }

  return (
    <div className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-zinc-900 border-zinc-600 text-white resize-none"
        rows={3}
        maxLength={1000}
        autoFocus
      />

      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-500">
          {content.length}/1000 • Strg+Enter zum Speichern • Esc zum Abbrechen
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4 mr-1" />
            Abbrechen
          </Button>
          <Button
            onClick={handleSave}
            disabled={!content.trim() || isSaving}
            size="sm"
            className="bg-green-600 hover:bg-green-700 disabled:bg-zinc-700"
          >
            <Check className="w-4 h-4 mr-1" />
            {isSaving ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </div>
      </div>
    </div>
  )
}
