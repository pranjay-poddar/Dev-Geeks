defmodule CounterWeb.PageLive do
  use CounterWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(number: 0)}
  end
  def handle_event("inc", _params, socket) do
    {:noreply,
     socket
     |> update(:number, &(&1 + 1))}
  end

  def handle_event("dec", _params, socket) do
    {:noreply,
     socket
     |> update(:number, &max(0, &1 - 1))}
  end

  def handle_event("clear", _params, socket) do
    {:noreply, socket |> assign(number: 0)}
  end

end
