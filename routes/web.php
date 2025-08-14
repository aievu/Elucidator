<?php

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

    Route::inertia('/write-note', 'write-note')->name('write-note');
    Route::inertia('/events', 'events')->name('events');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
