<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{

    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }


    public function create()
    {
        return view('tags.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:tags|max:255',
            'status' => 'boolean'
        ]);

        Tag::create($request->all());
        return redirect()->route('tags.index')->with('success', 'Tag criada com sucesso!');
    }

    public function show(Tag $tag)
    {
        return view('tags.show', compact('tag'));
    }

    public function edit(Tag $tag)
    {
        return view('tags.edit', compact('tag'));
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'nome' => 'required|max:255|unique:tags,nome,'.$tag->id,
            'status' => 'boolean'
        ]);

        $tag->update($request->all());
        return redirect()->route('tags.index')->with('success', 'Tag atualizada com sucesso!');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        return redirect()->route('tags.index')->with('success', 'Tag excluída com sucesso!');
    }
}
