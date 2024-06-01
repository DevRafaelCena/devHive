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
        return response()->json(['message' => 'Tag criada com sucesso!']);

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
            'nome' => 'required|max:255|unique:tags,nome,'.$tag->id
        ]);

        $tag->update($request->all());
        return response()->json(['message' => 'Tag atualizada com sucesso!']);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->json(null, 204);
    }
}
