defmodule Chat.ChatsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Chat.Chats` context.
  """

  @doc """
  Generate a message.
  """
  def message_fixture(attrs \\ %{}) do
    {:ok, message} =
      attrs
      |> Enum.into(%{
        body: "some body",
        name: "some name"
      })
      |> Chat.Chats.create_message()

    message
  end
end
