from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.filters import Command
from back.src.config import settings

bot = Bot(token=settings.BOT_API) 
dp = Dispatcher()

async def start_command(message: types.Message):
    button = types.InlineKeyboardButton(
        text="Open App",
        web_app=WebAppInfo(url="https://a2b186b79dd70422731cab3c661a95b0.serveo.net")
    )
    markup = types.InlineKeyboardMarkup(inline_keyboard=[[button]])
    await message.answer("Welcome! Click below to start:", reply_markup=markup)

dp.message.register(start_command, Command("start"))

async def start_bot():
    await dp.start_polling(bot)