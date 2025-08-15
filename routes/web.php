<?php

use App\Http\Controllers\WriteNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/send-email', function () {
        return Inertia::render('send-email');
    })->name('send-email');

    Route::get('/write-note', [WriteNoteController::class, 'index'])->name('write-note.index');
    Route::post('/write-note/store', [WriteNoteController::class, 'store'])->name('write-note.store');
    Route::delete('/write-note/{id}', [WriteNoteController::class, 'destroy'])->name('write-note.destroy');
    
    Route::inertia('/events', 'events')->name('events');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
