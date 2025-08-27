import React, { useEffect, useState } from 'react'
import { allUserTasksStatusUpdateApi, deleteTaskApi } from '../../services/allApi';

const STATUSES = ["Pending", "In-progress", "Done"]

function Kanbanboard({ tasks = [], onReload }) {
  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString() : "-";

  const nextStatus = async (s, id) => {
    if (s === 'Pending') {
      const result = await allUserTasksStatusUpdateApi(id, { status: 'In-progress' })
      onReload?.()

    }
    else if (s === 'In-progress') {
      const result = await allUserTasksStatusUpdateApi(id, { status: 'Done' })
      onReload?.()

    }

  }



  const deleteTask = async (id) => {
    const result = await deleteTaskApi(id)
    if (result.status == 200) {
      onReload?.()
    }
  }
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {STATUSES.map((status) => (
        <section key={status} className={`rounded-xl border border-dashed p-3  dark:border-neutral-800 ${status == "Pending" ? 'bg-blue-500' : status == "In-progress" ? 'bg-amber-400' : "bg-green-500"}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-100 text-lg">
              {status}
              <span className="ml-2 text-sm text-gray-100">
                {tasks.filter(t => t.status === status).length}
              </span>
            </h3>
          </div>

          <div className="space-y-3">
            {tasks.filter(t => t.status === status).map(task => (
              <article key={task.id} className="rounded-lg border bg-white p-3 shadow-sm dark:border-neutral-700">
                <h4 className="font-medium">{task.title}</h4>
                {task.description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">{task.description}</p>
                )}

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Due: {fmtDate(task.dueDate)}</span>
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => onEdit?.(task)}
                      className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => deleteTask?.(task._id)}
                      className="px-2 py-1 rounded hover:bg-red-50 text-red-600 dark:hover:bg-red-950/30 cursor-pointer"
                    >
                      Delete
                    </button>
                    {status !== 'Done' && (
                      <button
                        onClick={() => nextStatus(status, task._id)}
                        className={`cursor-pointer px-2 py-1 rounded text-white ${status == 'In-progress' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} `}
                      >
                        Move →
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Kanbanboard
