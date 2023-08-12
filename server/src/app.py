import os
import uvicorn
from fastapi import FastAPI, Body, Cookie, Response, Header, HTTPException, status
from pydantic import BaseModel
from typing import Annotated
from supabase import Client, create_client


class Login(BaseModel):
    email: str
    password: str


class Item(BaseModel):
    name: str
    image_urls: list
    price: float
    url: str
    brand: str
    description: str
    is_available: str


class Collection(BaseModel):
    name: str
    description: str


class CollectionItem(BaseModel):
    item_id: int
    collection_id: int


app = FastAPI()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


async def validate_credentials(access_token: str):
    if not access_token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    session = supabase.auth.get_session()
    if not session:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if session.access_token != access_token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return session


@app.get("/")
async def root():
    return {"message": "Welcome to Trove"}


@app.post("/sign-up")
async def sign_up(data: Login):
    try:
        supabase.auth.sign_up(data)
    except Exception as e:
        return {"success": False, "message": f"Error: {e}"}
    return {"success": True}


@app.post("/login")
async def login(data: Login, response: Response):
    try:
        supabase.auth.sign_in_with_password(
            {"email": data.email, "password": data.password}
        )
    except Exception as e:
        return {"success": False, "message": f"Error: {e}"}
    session = supabase.auth.get_session()
    response.set_cookie(key="access_token", value=session.access_token)
    return {"success": True}


@app.get("/logout")
async def logout():
    try:
        supabase.auth.sign_out()
    except Exception as e:
        return {"success": False, "message": f"Error: {e}"}
    return {"success": True}


@app.get("/get-session")
async def get_session(
    access_token: Annotated[str | None, Cookie()] = None,
):
    if not access_token:
        return {"session": False}
    try:
        session = supabase.auth.get_session()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    if not session:
        return {"session": False}
    if session.access_token != access_token:
        return {"session": False}
    return {"session": True}


@app.get("/get-user-info")
async def get_user_info(access_token: Annotated[str | None, Cookie()] = None):
    session = await validate_credentials(access_token)
    return {"email": session.user.email, "createdAt": session.user.created_at}


@app.get("/get-collections")
async def get_collections(access_token: Annotated[str | None, Cookie()] = None):
    session = await validate_credentials(access_token)
    try:
        collections = (
            supabase.table("collection")
            .select("*")
            .eq("user_id", session.user.id)
            .execute()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return collections.data


@app.get("/get-collection-item-ids/{collection_id}")
async def get_collection_item_ids(
    collection_id: int, access_token: Annotated[str | None, Cookie()] = None
):
    await validate_credentials(access_token)
    if not collection_id:
        raise HTTPException(status_code=400, detail="Invalid collection id")
    try:
        collection_items = (
            supabase.table("collection_item")
            .select("item_id")
            .eq("collection_id", collection_id)
            .execute()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return list(
        map(lambda collection_item: collection_item["item_id"], collection_items.data)
    )


@app.get("/get-items")
async def get_items(access_token: Annotated[str | None, Cookie()] = None):
    session = await validate_credentials(access_token)
    try:
        items = (
            supabase.table("item")
            .select("*")
            .eq(
                "user_id",
                session.user.id,
            )
            .execute()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return items.data


@app.post("/add-item")
async def add_item(
    item: Item,
    collection_id: int | None = None,
    access_token: Annotated[str | None, Cookie()] = None,
):
    session = await validate_credentials(access_token)
    try:
        item_data = {
            "name": item.name,
            "price": item.price,
            "description": item.description,
            "url": item.url,
            "image_urls": item.image_urls,
            "brand": item.brand,
            "is_available": item.is_available,
            "user_id": session.user.id,
        }
        new_item = supabase.table("item").insert(item_data).execute()

        if collection_id:
            collection_item_data = {
                "item_id": new_item.data[0]["id"],
                "collection_id": collection_id,
            }
            supabase.table("collection_item").insert(collection_item_data).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return new_item.data


@app.post("/delete-item/{item_id}")
async def delete_item(
    item_id: int,
    access_token: Annotated[str | None, Cookie()] = None,
):
    await validate_credentials(access_token)
    try:
        supabase.table("collection_item").delete().eq("item_id", item_id).execute()
        supabase.table("item").delete().eq("id", item_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return {"success": True}


@app.post("/edit-item/{item_id}")
async def edit_item(
    item_id: int,
    item: Item,
    access_token: Annotated[str | None, Cookie()] = None,
):
    session = await validate_credentials(access_token)
    item_data = {
        "name": item.name,
        "image_urls": item.image_urls,
        "price": item.price,
        "url": item.url,
        "brand": item.brand,
        "description": item.description,
        "is_available": item.is_available,
        "user_id": session.user.id,
    }
    try:
        updated_item = (
            supabase.table("item").update(item_data).eq("id", item_id).execute()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return updated_item.data


@app.post("/create-collection")
async def create_collection(
    collection: Collection,
    access_token: Annotated[str | None, Cookie()] = None,
):
    session = await validate_credentials(access_token)
    collection_data = {
        "name": collection.name,
        "description": collection.description,
        "user_id": session.user.id,
    }

    try:
        new_collection = supabase.table("collection").insert(collection_data).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return new_collection.data


@app.post("/delete-collection/{collection_id}")
async def delete_collection(
    collection_id: int,
    access_token: Annotated[str | None, Cookie()] = None,
):
    await validate_credentials(access_token)
    try:
        supabase.table("collection_item").delete().eq(
            "collection_id", collection_id
        ).execute()
        supabase.table("collection").delete().eq("id", collection_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return {"success": True}


@app.post("/edit-collection/{collection_id}")
async def edit_collection(
    collection_id: int,
    collection: Collection,
    access_token: Annotated[str | None, Cookie()] = None,
):
    session = await validate_credentials(access_token)
    collection_data = {
        "name": collection.name,
        "description": collection.description,
        "user_id": session.user.id,
    }

    try:
        updated_collection = (
            supabase.table("collection")
            .update(collection_data)
            .eq("id", collection_id)
            .execute()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return updated_collection.data


@app.post("/add-to-collection")
async def add_to_collection(
    collection_item: CollectionItem,
    access_token: Annotated[str | None, Cookie()] = None,
):
    await validate_credentials(access_token)
    collection_item_data = {
        "item_id": collection_item.item_id,
        "collection_id": collection_item.collection_id,
    }
    try:
        supabase.table("collection_item").insert(collection_item_data).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
    return {"success": True}


def run():
    uvicorn.run("src.app:app", host="0.0.0.0", port=8000, reload=True)
