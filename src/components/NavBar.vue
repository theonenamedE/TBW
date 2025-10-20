<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-10">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><RouterLink class="text-xl" to="/">Home</RouterLink></li>
          <li><RouterLink class="text-xl" to="/list">List</RouterLink></li>
          <li><RouterLink class="text-xl" to="/add">Add</RouterLink></li>
        </ul>
      </div>
      <RouterLink class="btn btn-ghost text-xl" to="/">To Vue</RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><RouterLink class="text-xl" to="/">Home</RouterLink></li>
        <li><RouterLink class="text-xl" to="/list">List</RouterLink></li>
        <li><RouterLink class="text-xl" to="/add">Add</RouterLink></li>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink class="btn" to="/add">Get Started</RouterLink>
    </div>
  </div>
</template>
