<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class WriteNoteController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $notes = Note::where('user_id', $user->id)->orderByDesc('created_at')->get();

        return inertia('write-note', [
            'notes' => $notes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:50',
            'note' => 'required|string|max:800'
        ]);

        $request['user_id'] = auth()->id();

        Note::create($request->only(['title', 'note', 'user_id']));

        return redirect()->route('write-note.index')->with('success', 'The note has been saved.');
    }

    public function destroy($id)
    {
        $note = Note::where('id', $id)->firstOrFail();

        if (!$note) {
            return redirect()->back()->with('error', 'Error to delete the note.');
        }

        $note->delete();

        return redirect()->route('write-note.index')->with('success', 'Success to delete the note.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:50',
            'note' => 'required|string|max:800'
        ]);

        $note = Note::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        if (!$note) {
            return redirect()->back()->with('error', 'Error to update the note.');
        }

        $note->update($data);

        return redirect()->route('write-note.index')->with('success', 'Note updated.');
    }
}
